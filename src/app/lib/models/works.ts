import { Schema, model, models } from 'mongoose';

const workSchema = new Schema({
    thumbnail: {type: String, required: true},
    image: {type:  [String], validate: [arrayLimit, 'Exceeded maximum number of images (5)'], default: []},
    title: { type: String, required: true },
    desc: { type: String, require: true},
    link: { type: String, require: true},
    slug: { type: String, unique: true, required: true, lowercase: true },
    
}, {timestamps: true});


function arrayLimit(val: string[]) {
    return val.length <= 5;
}

const Work = models.Work || model("Work", workSchema);
export default Work;
