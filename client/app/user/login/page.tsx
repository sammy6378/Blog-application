'use client'

import React,{useState,useEffect} from 'react';
import '../../app.css';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import { ValidateLoginSchema } from '@/components/utils/validate';

interface formData {
    email: string;
    password: string;
}

const onSubmit = (values: formData) => {
    console.log('Form Submitted', values);
  };

const  Login = () => {

    const [mounted, setMounted] = useState(false);
    
        useEffect(() => {
            setMounted(true);
        }, []);

    const {values,handleChange, handleBlur, handleSubmit,errors, touched} = useFormik({
        initialValues:{email: '', password: ''},
        validationSchema: ValidateLoginSchema,
        onSubmit,
    })

    if (!mounted) return null;

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 bg-white rounded shadow-md transition duration-500">
        <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 shadow-lg p-6 max-w-md w-full rounded-xl">
            <h2 className="text-3xl font-bold text-purple-900 dark:text-white mb-6">Sign In</h2>

        <form className="w-full space-y-4" onSubmit={handleSubmit}>

            {/*email field */}
          <div>
          <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={values.email}
              id='email'
              onBlur={handleBlur}
              className={`input-container ${errors.email && touched.email ? 'input-error' : ''}`}
              onChange={handleChange}
            />
            {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
          </div>

            {/* password field */}
          <div>
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              placeholder="Password"
              id='password'
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              className={`input-container ${errors.password && touched.password ? 'input-error' : ''}`}
            />
            {errors.password && touched.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300">
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex-grow h-px bg-black dark:bg-gray-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">OR</span>
            <div className="flex-grow h-px bg-black dark:bg-gray-600"></div>
        </div>

        <div className="w-full mt-4 flex flex-col justify-between gap-3 md:flex-row">
            <button className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-3 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
                <Image src="/github.png" alt="GitHub" className="mr-2" width={25} height={25} />
                GitHub
            </button>
            <button className="w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-3 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
                <Image src="/google.png" alt="Google" className="mr-2" width={25} height={25} />
                Google
            </button>
        </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
            Don't have an account? <Link href="/user/register" className="text-purple-500 hover:underline">Sign Up</Link>
            </p>
      </div>
    </div>
  );
}

export default Login;
