import urlModel from "../model/urlModel.js";
import userModel from "../model/userModel.js";

const deleteRouter = async (req, res) => {
    const shortCode = req.params.shortCode;
    try {
        const user = await userModel.findById(req.cookies.token._payload.id);
        let urlsId = user.shortenedUrls;
        let deleteUrl = await urlModel.findOne({shortCode: shortCode})
        let deleteUrlId = deleteUrl._id;
        let index = urlsId.indexOf(deleteUrlId);
        if (index !== -1) {
            urlsId.splice(index, 1);
            await user.save();
        }
        let deletedUrl = await urlModel.deleteOne({shortCode: shortCode});
        if (user == null || deletedUrl == null) {
            return res.status(404).render("404");
        }
        res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(404).render("404");
    }
}

export default deleteRouter;