import express from 'express';
import { ActivateUser, RegisterUser, userLogin } from '../controller/userController';
const route = express.Router();

//api/user/register
route.post("/register", RegisterUser);
//api/user/activate
route.post('/activate-you', ActivateUser);
//api/user/login
route.post('/login', userLogin);

export default route;