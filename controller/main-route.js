import userModel from "../model/userModel.js";
import urlModel from "../model/urlModel.js";
import { SignJWT } from "jose";
import * as crypto from "crypto";
import moment from "moment";
import { configDotenv } from "dotenv";
configDotenv();
const baseUrl = process.env.BASE_URL;
console.log("base url: " + baseUrl);



const mainRoute = async (req, res) => {
    const token = req.cookies.token;

    try {
        if (token == undefined) {
            res.redirect("/user/login");
        } else {
            const userId = token._payload.id;
            const user = await userModel.findById(userId);
            const urls = await urlModel.find({ userId });
            res.status(200).render("home", { user, urls, moment, baseUrl });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).render("404");
    }
};

export default mainRoute;