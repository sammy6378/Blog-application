"use client";

import React, { useState, useEffect } from "react";
import "../../app.css";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { validateRegisterSchema } from "@/components/utils/validate";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {X} from 'lucide-react'
import OutsideClickHandler from "react-outside-click-handler";
import axios from 'axios';
import { useContextFunc } from "@/components/context/AppContext";
import {toast} from 'react-hot-toast'

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const {url, setActivationToken, activationToken} = useContextFunc();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  //submit function
  const onSubmit = async (values: FormData) => {
    setloading(true);
    const newUrl = url + "/api/user/register";
    try {
      const response = await axios.post(newUrl, values);
      if(response.data.success) {
        router.push('/user/activate-user');
        toast.success(response.data.message);
        setActivationToken(response.data.activationToken);
       // console.log(response.data.activationToken);
      } else {
        toast.error(response.data.message);
      }

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.log(error.message);
    } finally {
      setloading(false);
    }
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: { name: "", email: "", password: "" },
      validationSchema: validateRegisterSchema,
      onSubmit,
    });

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 bg-white rounded shadow-md transition duration-500 ">
      <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 shadow-lg p-6 max-w-md w-full rounded-xl max-md:mx-2 max-md:py-2 max-500:p-2 relative">
        <h2 className="text-3xl max-md:text-2xl max-300px:text-lg font-bold text-purple-900 dark:text-white mb-5">
          Sign Up
        </h2>
        <X className="absolute top-2 right-2 text-gray-900 dark:text-white cursor-pointer" onClick={() => router.back()} />
 
        <form className="w-full space-y-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="input-label">
              Name:
            </label>
            <input
              type="text"
              value={values.name}
              onChange={handleChange}
              id="name"
              onBlur={handleBlur}
              placeholder="Enter your name"
              className={`input-container ${errors.name && touched.name ? "input-error" : ""}`}
            />
            {errors.name && touched.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="input-label">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={values.email}
              id="email"
              onBlur={handleBlur}
              className={`input-container ${errors.email && touched.email ? "input-error" : ""}`}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div>
            <div className="relative">
              <label htmlFor="password" className="input-label">
                Password:
              </label>
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                id="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                className={`input-container ${errors.password && touched.password ? "input-error" : ""}`}
              />
              {showPassword ? (
                <span
                  className="absolute top-[54%] right-2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FaEyeSlash />
                </span>
              ) : (
                <span
                  className="absolute top-[54%] right-2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FaEye />
                </span>
              )}
            </div>
            {errors.password && touched.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button type="submit" className={`submit-button max-500:py-2 ${loading ? "bg-purple-500 cursor-not-allowed" : ""}`} disabled={loading}>
            {!loading ? "Sign Up" : "Signing up..."}
          </button>
        </form>
        
        <div className="w-full flex items-center justify-center gap-3 mb-3 mt-4">
          <hr className="w-full h-px bg-gray-400 dark:bg-gray-900"></hr>
          <span className="text-sm text-gray-600 dark:text-gray-300">OR</span>
          <hr className="w-full h-px bg-gray-400 dark:bg-gray-900"></hr>
        </div>

        <div className="w-full mt-4 flex flex-col justify-between gap-3 md:flex-row">
          <button className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-3 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
            <Image
              src="/github.png"
              alt="GitHub"
              className="mr-2"
              width={25}
              height={25}
            />
            GitHub
          </button>
          <button className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-3 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
            <Image
              src="/google.png"
              alt="Google"
              className="mr-2"
              width={25}
              height={25}
            />
            Google
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 pb-2">
          Already have an account?{" "}
          <Link href="/user/login" className="text-purple-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
