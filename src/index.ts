import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import { PORT , MONGO_URL } from './config';
import { urlRouter } from './routes/urlRoutes';

const app = express();


app.use(express.json());
app.use(cors());

app.use("/" , urlRouter);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/' , (req , res) => {
    res.send("API is UP!!")
})

async function main() {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT , () => {console.log(`Backend Hosted on: http://localhost:${PORT}`)});
    console.log("Connection Successfully Established to the Database!!")
}
main();