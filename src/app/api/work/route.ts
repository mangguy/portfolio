import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';
import connectToDb from "@/app/lib/utiis";
import Work from "@/app/lib/models/works";



// POST
export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectToDb();

    // Get form data
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const title = formData.get('title') as string;
    const desc = formData.get('desc') as string;
    const link = formData.get('link') as string;
    const slug = formData.get('slug') as string;

    // Validate inputs
    if (!files || files.length === 0) {
      return NextResponse.json({ message: 'No files uploaded' }, { status: 400 });
    }

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads/images/works');
    await fs.mkdir(uploadDir, { recursive: true });

    // Process and save files
    const processedImages: string[] = [];
    
    for (const file of files) {
      // Generate unique filename
      const timestamp = Date.now();
      const originalName = file.name;
      const fileExt = path.extname(originalName);
      const newFilename = `${timestamp}-${Math.round(Math.random() * 1000)}${fileExt}`;
      const filePath = path.join(uploadDir, newFilename);

      // Convert file to buffer and write
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);

      // Store relative path for database
      processedImages.push(`/uploads/images/works/${newFilename}`);
    }

    // Determine thumbnail (first image)
    const thumbnail = processedImages[0];
    const additionalImages = processedImages.slice(1, 6);

    // Create work entry
    const newWork = new Work({
      thumbnail,
      image: additionalImages,
      title,
      desc,
      link,
      slug
    });

    // Save to database
    try {
      await newWork.save();
    } catch (dbError) {
      // Log specific database error
      console.error('Database Save Error:', dbError);
      
      // Clean up uploaded files if database save fails
      for (const imagePath of processedImages) {
        try {
          await fs.unlink(path.join(process.cwd(), 'public' + imagePath));
        } catch (unlinkError) {
          console.error('Error removing uploaded file:', unlinkError);
        }
      }

      // Return detailed error
      return NextResponse.json({
        message: 'Failed to save to database',
        error: dbError instanceof Error ? dbError.message : 'Unknown database error'
      }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Upload successful',
      work: newWork
    }, { status: 201 });

  } catch (error) {
    console.error('Overall Upload Error:', error);
    return NextResponse.json({
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET
export async function GET() {
  try {

    await connectToDb();
    
    const works = await Work.find();
    
    if(!works) {
      return NextResponse.json({message: 'Error: posts is not found'}, {status: 404})
    }

    return NextResponse.json(works, {status: 200})
  }catch(err) {
    console.log("GET error:", err);
    return NextResponse.json({message: "Get error", error: String(err)}, {status: 500})
  }
}


// PUT
export async function PUT(request: NextRequest) {
  try {
    // Connect to database
    await connectToDb();

    // Parse the request body
    const formData = await request.formData();
    
    // Get the work ID to update
    const id = formData.get('id') as string;
    
    if (!id) {
      return NextResponse.json({ message: 'Work ID is required' }, { status: 400 });
    }

    // Find the existing work
    const existingWork = await Work.findById(id);
    
    if (!existingWork) {
      return NextResponse.json({ message: 'Work not found' }, { status: 404 });
    }

    // Update fields
    const title = formData.get('title') as string || existingWork.title;
    const desc = formData.get('desc') as string || existingWork.desc;
    const link = formData.get('link') as string || existingWork.link;
    const slug = formData.get('slug') as string || existingWork.slug;

    // Handle file uploads
    const files = formData.getAll('files') as File[];
    const uploadDir = path.join(process.cwd(), 'public/uploads/images/works');
    
    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Process new images if uploaded
    const processedImages: string[] = [];
    if (files && files.length > 0) {
      // Remove old images
      const oldImages = [...existingWork.image, existingWork.thumbnail];
      for (const oldImage of oldImages) {
        try {
          await fs.unlink(path.join(process.cwd(), 'public' + oldImage));
        } catch (unlinkError) {
          console.error('Error removing old file:', unlinkError);
        }
      }

      // Upload new images
      for (const file of files) {
        const timestamp = Date.now();
        const originalName = file.name;
        const fileExt = path.extname(originalName);
        const newFilename = `${timestamp}-${Math.round(Math.random() * 1000)}${fileExt}`;
        const filePath = path.join(uploadDir, newFilename);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        processedImages.push(`/uploads/images/works/${newFilename}`);
      }
    }

    // Update work
    const updatedWork = await Work.findByIdAndUpdate(
      id, 
      {
        title,
        desc,
        link,
        slug,
        ...(processedImages.length > 0 && {
          thumbnail: processedImages[0],
          image: processedImages.slice(1, 6)
        })
      }, 
      { new: true }
    );

    return NextResponse.json({
      message: 'Work updated successfully',
      work: updatedWork
    }, { status: 200 });

  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({
      message: 'Update failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}



// DELETE Route
export async function DELETE(request: NextRequest) {
  try {
    // Connect to database
    await connectToDb();

    // Get work ID from query parameters
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Work ID is required' }, { status: 400 });
    }

    // Find the work to delete
    const workToDelete = await Work.findById(id);

    if (!workToDelete) {
      return NextResponse.json({ message: 'Work not found' }, { status: 404 });
    }

    // Remove images from server
    const imagesToDelete = [
      workToDelete.thumbnail,
      ...workToDelete.image
    ];

    for (const imagePath of imagesToDelete) {
      try {
        await fs.unlink(path.join(process.cwd(), 'public' + imagePath));
      } catch (unlinkError) {
        console.error('Error removing image file:', unlinkError);
      }
    }

    // Delete work from database
    await Work.findByIdAndDelete(id);

    return NextResponse.json({
      message: 'Work deleted successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Delete Error:', error);
    return NextResponse.json({
      message: 'Delete failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}




