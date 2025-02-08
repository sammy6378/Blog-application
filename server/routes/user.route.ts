import express from 'express';
import { ActivateUser, DeleteMyAccount, DeleteUserAccount_Admin, GetAllUsers, getUserInfo, logoutUser, RegisterUser, socialAuth, UpdateAccessToken, updateUserAvatar, updateUserInfo, updateUserPass, UpdateUserRole, userLogin } from '../controllers/userController';
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
//api/user/update-avatar
route.put("/update-avatar", authMiddleware, updateUserAvatar);
//api/user/social-auth
route.post('/social-auth', socialAuth);
//api/user/update-role
route.put('/update-role', authMiddleware, authorizeRoles("admin"), UpdateUserRole);
//api/user/get-users
route.get('/get-users', authMiddleware, authorizeRoles("admin"), GetAllUsers);
//api/user/delete_user_by_admin
route.delete('/delete_user_by_admin', authMiddleware, authorizeRoles("admin"), DeleteUserAccount_Admin);
//api/user/delete_my_account
route.delete('/delete_my_account', authMiddleware, DeleteMyAccount);

export default route;