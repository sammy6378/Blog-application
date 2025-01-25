import express from 'express';
import { ActivateUser, getUserInfo, logoutUser, RegisterUser, UpdateAccessToken, updateUserInfo, updateUserPass, userLogin } from '../controller/userController';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
const route = express.Router();

//api/user/register
route.post("/register", RegisterUser);
//api/user/activate
route.post('/activate-you', ActivateUser);
//api/user/login
route.post('/login', userLogin);
//api/user/logout
route.post('/logout', authMiddleware, logoutUser);
//api/user/update-token
route.post('/update-token', authMiddleware, UpdateAccessToken);
//api/user/get-user
route.get("/get-user-info", authMiddleware, authorizeRoles("admin"), getUserInfo);
//api/user/update-password
route.put("/update-password", authMiddleware, updateUserPass);
//api/user/update-info
route.put("/update-info", authMiddleware, updateUserInfo);

export default route;