import urlModel from "../model/urlModel.js";

const shortUrlRoute = async (req, res) => {
    const shortCode = req.params.shortCode
    try {
                const url = await urlModel.findOneAndUpdate({shortCode: shortCode}, {$inc: {clicks: 1}}, {new: true});
            // await url.clicks++;
            // await url.save();
            const originalUrl = url.longUrl;
            res.redirect(`${originalUrl}`);
    } catch (error) {
        console.log(error);
        return res.status(404).render("404");
    }
}

export default shortUrlRoute;