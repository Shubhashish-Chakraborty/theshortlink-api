import { Schema , model , Types } from "mongoose";

const UrlSchema = new Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    urlCode: { type: String, required: true, unique: true },
    userId: {type: Types.ObjectId, required:true},
    date: { type: Date, default: Date.now }
});

// UrlModel:
export const UrlModel = model("urls" , UrlSchema);