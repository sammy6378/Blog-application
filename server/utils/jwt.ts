import { Response } from "express";
import { IUser } from "../models/userModel";
import { redis } from "./redis";
require("dotenv").config();

interface TokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const accessTokenExpires = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "5");
const refreshTokenExpires = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "7");

export const accessTokenOptions: TokenOptions = {
  expires: new Date(Date.now() + accessTokenExpires * 60 * 1000),
  maxAge: accessTokenExpires * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const refreshTokenOptions: TokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpires * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpires * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export const sendToken = async (user: IUser, res: Response) => {
  const access_token = user.signAccessToken();
  const refresh_token = user.signRefreshToken();

  //add user session to redis
  await redis.set(user._id as string, JSON.stringify(user));

  res.cookie("access_token", access_token, accessTokenOptions);
  res.cookie("refresh_token", refresh_token, refreshTokenOptions);
  res.json({ success: true, user, accessToken: access_token });
};
