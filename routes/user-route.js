import { Router } from "express";
import userRegister from "../controller/user-register.js";
import userLogin from "../controller/user-login.js";
import { validate } from "../middleware/validate-middleware.js";
import { registerSchema } from "../model/validator.js";
const route = Router();


route.get("/login", (req, res) => {
    res.status(200).render("login");
});

route.get("/register", (req, res) => {
    res.status(200).render("register");
});


route.post("/login", userLogin);

route.post("/register", validate(registerSchema), userRegister);

route.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/user/login");
})

const userRouter = route;

export default userRouter;