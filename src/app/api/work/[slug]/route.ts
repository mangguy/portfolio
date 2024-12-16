import Work from "@/app/lib/models/works";
import connectToDb from "@/app/lib/utiis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {slug: string}}) {
    try {
        
        // const slug = await params.slug;
        const { slug } = await params;
        await connectToDb();

        const work = await Work.findOne({slug}).lean();

        if(!work) {
            return NextResponse.json(
                {message: 'Work not found'}, 
                {status: 404}
            );
        }

        return NextResponse.json(work, {status: 200});
    } catch(err) {
        console.error("GET error:", err);
        return NextResponse.json(
            {message: "Server error", error: String(err)}, 
            {status: 500}
        );
    }
}

