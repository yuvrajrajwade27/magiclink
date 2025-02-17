import urlModel from "../model/urlModel.js";
import userModel from "../model/userModel.js";
import * as crypto from "crypto";

const shortUrl = async (req, res) => {
    const { long_url } = req.body;
    const userId = req.cookies.token._payload.id;
    try {
        const newShortUrl = await urlModel.create({
            shortCode: crypto.randomBytes(6).toString("hex"),
            longUrl: long_url,
            userId: userId
        });
        const user = await userModel.findById(userId);
        user.shortenedUrls.push(newShortUrl._id);
        await user.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(404).render("404");
    }
}

export default shortUrl;