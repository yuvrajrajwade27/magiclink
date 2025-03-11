import mongoose from "mongoose";

try {
    await mongoose.connect("mongodb+srv://yuvrajrajwade605:nfhc9A5zPJotS6P5@magiclink.nnytx.mongodb.net/?retryWrites=true&w=majority&appName=magiclink");
    mongoose.set("debug", true);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
    process.exit();
}

const db = mongoose.connection;

export default db;