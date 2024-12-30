import { nanoid } from "nanoid";
import { Request , Response } from "express";
import { BASE_URL } from "../config";
import { UrlModel } from "../models/urlModel";

export const shortenUrl = async (req:Request , res:Response) => {
    const { longUrl } = req.body; // Retriving the actual(long) URL from the body

    if (!longUrl) {
        res.status(400).json({ message: 'Please provide a valid URL.' });
        return;
    }

    try {
        const urlCode = nanoid(6); // Generating a random 6-character code
        const existingUrl = await UrlModel.findOne({ longUrl });

        if (existingUrl) {
            res.json(existingUrl); // Return if already exists
            return;
        }

        const shortUrl = `${BASE_URL}/${urlCode}`;
        const newUrl = new UrlModel({ longUrl, shortUrl, urlCode });
        await newUrl.save();

        res.json(newUrl); // Will Catch the Short URL from this object in the Frontend!
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

export const redirectUrl = async (req:Request , res:Response) => {
    const { urlCode } = req.params; // Will retrive the /urlcode from the query parameter!

    try {
        const url = await UrlModel.findOne({ urlCode });

        if (!url) {
            res.status(404).json({ message: 'URL not found.' });
            return;
        }

        res.redirect(url.longUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};