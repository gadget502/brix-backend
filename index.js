import express from "express";
import logger from "morgan";
import favicon from "serve-favicon";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import easySession from "easy-session";
import cookie from "cookie";
import path from "path";
import fs from "fs";
import axios from "axios";
import moment from "moment-timezone";
import cookieSession from "cookie-session";
const cors = require("cors");

const debug = require("debug")("brix:server");

//external module setting
let nowTime = moment().tz("Asia/Seoul");

let app = express();



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "1gb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "1gb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "dhlwn",
    resave: false,
    saveUninitialized: true
  })
);
app.use(easySession.main(session));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


import { router as apiRouter } from "./routes/api";

//router setting
app.use("/api", apiRouter);

module.exports = app;

