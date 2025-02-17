import mongoose from "mongoose";
import urlModel from "./urlModel.js";

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true,unique: true},
    shortenedUrls: [{type: mongoose.Schema.Types.ObjectId, ref: "url"}]
}, {timestamps: true});

const userModel = mongoose.model("user", userSchema);

export default userModel;