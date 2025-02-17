import { Router } from "express";
import deleteRouter from "../controller/delete-route.js";
import shortUrlRoute from "../controller/short-url-route.js";
import shortUrl from "../controller/short-url.js";
const router = Router();


router.post("/shorted-url", shortUrl);

router.get("/:shortCode", shortUrlRoute);

router.get("/delete/:shortCode", deleteRouter);


const urlRoute = router;

export default urlRoute;