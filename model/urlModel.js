import mongoose from "mongoose";
import userModel from "./userModel.js";

const urlSchema = new mongoose.Schema({
    shortCode: { type: String, require: true},
    longUrl: { type: String, require: true},
    clicks: { type: Number, default: 0},
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true},
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
        index: { expires: 10}
    }
}, { timestamps: true });

const urlModel = mongoose.model("url", urlSchema);

export default urlModel;