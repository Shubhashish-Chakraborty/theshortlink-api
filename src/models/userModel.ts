import { Schema , model , Types } from "mongoose";

const UserSchema = new Schema({
    username: {type: String, required:true},
    password: {type: String, required:true},
    createdDate: { type: Date, default: Date.now }
});

// UserModel:
export const UserModel = model("users" , UserSchema);