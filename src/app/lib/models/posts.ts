
import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    thumbnail: {type: String},
    image: {type:  [String], validate: [arrayLimit, 'Exceeded maximum number of images (10)'], default: []},
    title: {type: String, required: true },
    full_title: {type: String, required: true },
    desc: {type: String, required: true},
    inspi: {type: String, required: true },
    slug: { type: String, unique: true, required: true, lowercase: true  },
    date: {type: String, require: true}
    
}, {timestamps: true});


function arrayLimit (val: string[]) {
    return val.length <= 9;
}

const Post = models.Post || model("Post", postSchema);
export default Post;
