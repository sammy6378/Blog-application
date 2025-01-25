import {app} from './app';
require('dotenv').config();
import 'dotenv/config'
import connectDB from './utils/db';
const PORT = process.env.PORT;
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
    connectDB();
})