// const { Router } = require("express");

import { Router } from "express";
import { shortenUrl , redirectUrl } from "../controllers/urlController";

export const urlRouter = Router();


// API to shorten URL
urlRouter.route('/shorten').post(shortenUrl);

// API to redirect to original URL
urlRouter.route('/:urlCode').get(redirectUrl);