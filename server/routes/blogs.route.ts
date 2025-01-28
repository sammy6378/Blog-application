import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { addBlog } from '../controllers/blogControllers';
const route = express.Router();


//add blog
//api/blogs/create-blog
route.post('/create-blog', authMiddleware, authorizeRoles("admin"), addBlog);

export default route;