import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { addBlog, addBlogComment, addBlogCommentReply, addReview, addReviewReply, addTag, BlogDislikes, BlogLikes, deleteBlog, deleteTag, getBlog, getBlogs, updateBlog } from '../controllers/blogControllers';
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
//add reply to comment
//api/blogs/add-comment-reply
route.put('/add-comment-reply', authMiddleware, addBlogCommentReply);
//add review to blog
//api/blogs/add-review
route.put('/add-review', authMiddleware, addReview);
//add review reply
//api/blogs/add-review-reply
route.put('/add-review-reply', authMiddleware, authorizeRoles("admin"), addReviewReply);
//delete blog --- only for admin
route.delete('/delete-blog:/id', authMiddleware, authorizeRoles("admin"), deleteBlog);
//add tag --- only for admin
route.put('/add-tag', authMiddleware, authorizeRoles("admin"), addTag);
//delete tag --- only for admin
route.delete('/remove-tag', authMiddleware, authorizeRoles("admin"), deleteTag);
//blog likes
route.put('/like', authMiddleware, BlogLikes);
//blog dislikes
route.put('/dislike', authMiddleware, BlogDislikes);

export default route;