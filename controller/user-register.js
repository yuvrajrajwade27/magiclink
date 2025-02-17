import userModel from "../model/userModel.js";
import urlModel from "../model/urlModel.js";
import { SignJWT } from "jose";
import * as bcrypt from "bcrypt"

const userRegister = async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(req.body);
    try {
        let existedUser = await userModel.findOne({email});
        if (existedUser) {
            return res.redirect("/user/login");
        }
        await bcrypt.genSalt(10, (err, salt) => {
            if (err) { return res.send(err.message) }
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) { return res.send(err.message) }
                const user = await userModel.create({
                    name: name.toUpperCase(),
                    email,
                    password: hash
                })
                const token = new SignJWT({name: user.name, email: user.email, id: user._id}, process.env.JWT_SECRET_KEY);
                res.cookie("token", token, {
                    maxAge: new Date(Date.now() + 3600000 * 24),
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                });
                res.redirect("/")
            })
        })
    } catch (error) {
        res.send(error.message);
    }
}

export default userRegister;