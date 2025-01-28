import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { addBlog, updateBlog } from '../controllers/blogControllers';
const route = express.Router();


//add blog
//api/blogs/create-blog
route.post('/create-blog', authMiddleware, authorizeRoles("admin"), addBlog);
//update blog
//api/blogs/update-blog:/id
route.put('/update-blog/:id', authMiddleware, authorizeRoles("admin"), updateBlog);

export default route;