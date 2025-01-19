import express from 'express';
import { ActivateUser, RegisterUser } from '../controller/userController';
const route = express.Router();

//api/user/register
route.post("/register", RegisterUser);
//api/user/activate
route.post('/activate-you', ActivateUser);

export default route;