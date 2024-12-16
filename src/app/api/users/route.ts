import { NextResponse } from "next/server";
import connectToDb from '../../lib/utiis';
import User from "@/app/lib/models/user";
import { Types } from "mongoose"


const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
    try {
        await connectToDb();
        const user = await User.find();
        return NextResponse.json(user, {status: 200});
        
    }catch(error: Error) {
        console.log("GET error", error)
        return new NextResponse("Error in fetching users"+ error.message, {status: 500})
    }
}


export const POST = async(request: Request) => {
    try {
        const body = await request.json();
        await connectToDb();
        const newUser = new User(body);
        await newUser.save();

        return NextResponse.json(JSON.stringify({message: "User is create", user: newUser}), {status: 200});
    
    }catch(error: Error) {
        console.log("POST error", error)
        return new NextResponse("Error in creating users"+ error.message, {status: 500})
    }
}

export const PUT = async(request: Request) => {
    try {
        const body = await request.json();
        const { userId, userName} = body;
        await connectToDb();


        if(!userId || !userName) {
            return NextResponse.json(JSON.stringify({message: "ID or new Name not found"}), {status: 400})
        }

        if(!Types.ObjectId.isValid(userId)) {
            return NextResponse.json(JSON.stringify({message: "Invalid user id"}), {status: 400})
        }

        const updateUser = await User.findOneAndUpdate(
            {userId: new ObjectId(userId)},
            {username: newaUsername},
            {new: true}

        );

        if(!updateUser) {
            return NextResponse.json(JSON.stringify({message: "user not found in database", user: updateUser}), { status: 400})
        }

        return NextResponse.json(JSON.stringify({message: "user is update", user: updateUser}), { status: 200})
        
    }catch(error: Error) {
        console.log("PUT error", error.message)
        return new NextResponse("Error in creating users"+ error.message, {status: 500})
    }
}