import userModel from "../model/userModel.js";
import urlModel from "../model/urlModel.js";
import { SignJWT } from "jose";
import * as bcrypt from "bcrypt"
import { now } from "mongoose";

const userLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existedUser = await userModel.findOne({email});
        if (existedUser) {
            const comparesion = await bcrypt.compare(password, existedUser.password);
            if(comparesion == true) {
                const token = new SignJWT({name: existedUser.name, email: existedUser.email, id: existedUser._id}, process.env.JWT_SECRET_KEY);
                res.cookie("token", token, {
                    maxAge: new Date(Date.now() + 3600000 * 24),
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                });
                res.redirect("/")
            } else {
                res.send("password is incorrect")
            }
        } else {
            res.send('user not found, please register')
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).render("404");
    }
}

export default userLogin;