"use client";

import React, { useState, useEffect } from "react";
import "../../app.css";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { ValidateLoginSchema } from "@/components/utils/validate";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface formData {
  email: string;
  password: string;
}

const onSubmit = (values: formData) => {
  console.log("Form Submitted", values);
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: ValidateLoginSchema,
      onSubmit,
    });

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 bg-white rounded shadow-md transition duration-500">
      <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 shadow-lg p-6 max-500:p-2 max-w-md w-full rounded-xl max-500:mx-2">
        <h2 className="text-3xl max-500:text-2xl max-300px:text-lg font-bold text-purple-900 dark:text-white mb-6">
          Sign In
        </h2>

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          {/*email field */}
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

          {/* password field */}
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
               {showPassword ? <span className="absolute top-[54%] right-2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}><FaEyeSlash /></span> : <span className="absolute top-[54%] right-2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(!showPassword)}><FaEye /></span>}
            </div>
            {errors.password && touched.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 max-500:py-2 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
          >
            Sign In
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
          Don't have an account?{" "}
          <Link
            href="/user/register"
            className="text-purple-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
