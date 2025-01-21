import express from 'express';
import { ActivateUser, logoutUser, RegisterUser, userLogin } from '../controller/userController';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
const route = express.Router();

//api/user/register
route.post("/register", RegisterUser);
//api/user/activate
route.post('/activate-you', ActivateUser);
//api/user/login
route.post('/login', userLogin);
//api/user/logout
route.post('/logout', authMiddleware, logoutUser)

export default route;