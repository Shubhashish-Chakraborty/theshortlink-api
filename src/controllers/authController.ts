import { Request , Response } from "express";
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from "../models/userModel";
import { JWT_USER_SECRET } from "../config";

const signUpValidation = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
});

const signInValidation = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
});

export const signup = async (req:Request , res:Response) => {
    try {
        const validatedData = signUpValidation.parse(req.body);
        const {username , password} = validatedData;
    
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return
        }
    
        const hashedPassword = await bcrypt.hash(password , 10);
    
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
        return
    }
    catch (err:any) {
        res.status(500).json({ message: err.message });
    }
}

export const signin = async (req: Request , res: Response) => {
    try {
        const validatedData = signInValidation.parse(req.body);
        const { username, password } = validatedData;

        const user = await UserModel.findOne({ username });
        if (!user) {
            res.status(400).json({ message: 'Incorrect credentials' });
            return
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Incorrect credentials' });
            return;
        }

        const token = jwt.sign({ id: user._id }, JWT_USER_SECRET);
        
        res.status(200).json({ token });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}