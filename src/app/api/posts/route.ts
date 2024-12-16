import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';
import connectToDb from '@/app/lib/utiis';
import Post from "@/app/lib/models/posts"


// GET
export async function GET() {
    try {
        await connectToDb();
        const posts = await Post.find();

        if (!posts) {
            return NextResponse.json(JSON.stringify({ message: "posts is not found " }), { status: 400 });
        }
        return NextResponse.json(posts, { status: 200 });

    } catch (error) {
        console.log("GET POST Error", error);
        return NextResponse.json("Error in fetching users" + error, { status: 400 })
    }
}

// POST
export async function POST(request: NextRequest) {
    try {

        await connectToDb();

        // Get fromData Browser
        const formData = await request.formData();
        const files = formData.getAll('files') as File[];
        const title = formData.get('title') as string;
        const full_title = formData.get('full_title') as string;
        const desc = formData.get('desc') as string;
        const inspi = formData.get('inspi') as string;
        const slug = formData.get('slug') as string;
        const date = formData.get('date') as string;


        // Validate inputs
        if (!files || files.length === 0) {
            return NextResponse.json({ message: 'No files uploaded' }, { status: 400 });
        }

        //   upload ไปยัง directory
        const uploadDir = path.join(process.cwd(), 'public/uploads/images/gallery');
        await fs.mkdir(uploadDir, { recursive: true })

        // process and save file 
        const processedImages: string[] = [];

        // Generate unique filename
        for (const file of files) {
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
            processedImages.push(`/uploads/images/gallery/${newFilename}`);

        }

        // ภาพแรกที่ upload คือ thumbnail
        const thumbnail = processedImages[0];
        const additionalImages = processedImages.slice(1, 9);


        // สร้าง Posts entry
        const newGallery = new Post({
            thumbnail,
            image: additionalImages,
            title,
            full_title,
            desc,
            inspi,
            slug,
            date
        });

        // save to database
        try {
            await newGallery.save();

        } catch (dbError) {
            console.error('Database save erorr:', dbError);

            // Clean up uploaded files if database save fails
            for(const imagePath of processedImages) {
                try {
                    await fs.unlink(path.join(process.cwd(), 'public' + imagePath))
                }catch(unlinkError) {
                    console.error('Error removing uploaded file:', unlinkError);
                }
            }

            return NextResponse.json({message: 'Failed to save to database', error: dbError instanceof Error ? dbError.message : 'Unknown database error'}, {status: 500})
        }

        return NextResponse.json({ message: 'Upload Success', posts: newGallery}, {status: 200});

    } catch (error) {
        console.log('POST Gallery server error:', error)
        return NextResponse.json({ message: 'Upload Failed', error: error }, { status: 500 })
    }

}



// DELETE
export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        console.log("ID Connec: ", id)

        if (!id) {
            return NextResponse.json(JSON.stringify({ message: "Post ID is require" }), { status: 400 });
        }

        await connectToDb();

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json(JSON.stringify({ message: "Post not found" }), { status: 404 });
        }

        return NextResponse.json(JSON.stringify({
            message: `Delete Post ${id} successfully!!`,
            post: deletedPost
        }), { status: 200 })
    } catch (error) {
        console.log("DELETE posts Error", error);
        return NextResponse.json("Error in deleting post: " + error, { status: 400 })
    }
}

