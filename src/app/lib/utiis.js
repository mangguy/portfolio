import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;


const connectToDb = async () => {

    const connectionState = mongoose.connection.readyState;
    
    if(connectionState === 1) {
        console.log("Alredy connected");
        return;
    }

    if(connectionState === 2) {
        console.log("Connecting...")
        
    }

    try {
        await mongoose.connect(MONGODB_URL, {
            dbName: "portfolioDB",
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        

        console.log("Connected")
    }catch(error) {
        console.log("In connectionState Error", error);
        throw new Error("Error connecting to dataabse");
    }
}

export default connectToDb;


export function generateSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, hyphens with a single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}





