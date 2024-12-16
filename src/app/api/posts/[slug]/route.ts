import { NextResponse, NextRequest } from "next/server";
import connectToDb from '../../../lib/utiis';
import Post from "@/app/lib/models/posts"





export const GET = async( request: NextRequest, { params }: { params: { slug: string } }) => {
    try {
        const slug = params.slug;
        console.log(slug)

        await connectToDb();

        const post = await Post.findOne({slug: slug}).lean();
        console.log("Founfd post:", post? "yes": "No");
    
        
        if(!post) {
            return NextResponse.json({message: "post not found"}, {status: 400})
        }

        return NextResponse.json(post, {status: 200})

    }catch(error) {
        console.log("GET POST [slug] Error", error);
        return  NextResponse.json("Error in fetching users"+ error, {status: 400})
    }
}

export const DELETE = async(request: Request, { params }: { params: { slug: string } }) => {

    try {
        await connectToDb();
        
        const result = await Post.deleteOne({ slug: params.slug });

        // ถ้าไม่มีการลบโพสต์ 
        if(result.deletedCount === 0) {
            return NextResponse.json({message: "Post not found"}, {status: 404});
        }        

        return NextResponse.json({message: "Delete successfully!!"}, {status: 200});

    }catch(error) {
        console.log("DELETE POST [slug] Error", error);
        return  NextResponse.json("Error in fetching users"+ error, {status: 400})
    }
}

