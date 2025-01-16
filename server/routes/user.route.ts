import express from 'express';
import { RegisterUser } from '../controller/userController';
const route = express.Router();

//api/user/register
route.post("/register", RegisterUser);

export default route;