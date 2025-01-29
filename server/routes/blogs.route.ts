import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { addBlog, addBlogComment, getBlog, getBlogs, updateBlog } from '../controllers/blogControllers';
const route = express.Router();


//add blog
//api/blogs/create-blog
route.post('/create-blog', authMiddleware, authorizeRoles("admin"), addBlog);
//update blog
//api/blogs/update-blog:/id
route.put('/update-blog/:id', authMiddleware, authorizeRoles("admin"), updateBlog);
// get blog
// api/blogs/get-blog
route.get('/get-blog/:id',authMiddleware,getBlog);
// get all blogs
// api/blogs/get-blogs
route.get('/get-blogs', authMiddleware, getBlogs);
//add comment to blog
//api/blogs/add-comment
route.put('/add-comment', authMiddleware, addBlogComment);

export default route;