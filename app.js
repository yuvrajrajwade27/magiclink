import express from "express";
import path from "path";
import ejs from "ejs";
import { configDotenv } from "dotenv";
import { z } from "zod";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import os from "os";
import cluster from "cluster";
import cookieParser from "cookie-parser";
configDotenv();
const app = express();
const cpuNum = os.cpus().length;
console.log(cpuNum);

import db from "./config/mongoose-connection.js";

import userRouter from "./routes/user-route.js";
import urlRoute from "./routes/url-route.js";
import mainRoute from "./controller/main-route.js";


app.set("view engine", "ejs");
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));


app.get("/", mainRoute);

app.use("/user", userRouter);

app.use("/", urlRoute);

app.use((req, res, next) => {
    res.status(404).render("404");
    next()
});

if (cluster.isPirmary) {
    // Fork workers
    for (let i = 0; i < cpuNum; i++) {
        cluster.fork();
    }
    // Restart workers if they exit
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died. restarting ...`);
        cluster.fork();
    })
} else {
    // worker processes handle HTTP requests
    const port = process.env.PORT;
    const portSchema = z.coerce.number().min(1).max(6500).default(3000);
    const parse = portSchema.parse(port);
    console.log(parse);
    app.listen(parse, () => {
        console.log(`app is running on port: ${parse}, process id: ${process.pid}`);
    });
    // Gracefull shutdown handling
    process.on("SIGTERM", () => {
        console.log(`worker ${process.pid} shutting down..`);
        app.close(() => process.exit());
    })
}

