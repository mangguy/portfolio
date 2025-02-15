import { Schema, model, models } from 'mongoose';


const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, min: 6,  select: false},
    isAdmin: {type: Boolean, default: false} 
}, {timestamps: true});

const User = models.User || model("User", userSchema)

export default User;