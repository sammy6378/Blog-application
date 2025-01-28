import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { addBlog } from '../controllers/blogControllers';
const route = express.Router();


//add blog
//api/blogs/add
route.post('/add', authMiddleware, authorizeRoles("admin"), addBlog);

export default route;