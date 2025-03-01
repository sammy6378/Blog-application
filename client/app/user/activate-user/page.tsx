"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import "../../app.css";
import { useContextFunc } from "@/components/context/AppContext";
import { activateUser } from "@/components/services/authService";

interface verifyNumber {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
}

export default function Verification() {
  const { activationToken } = useContextFunc();

  const router = useRouter();
  const [invalidError, setInvalidError] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<verifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });


  const verificationHandler = async () => {
    const activation_code = Object.values(verifyNumber).join("");
    if(!activationToken){
      setInvalidError(true);
      return;
    }

    try {
      console.log("Activation Code:", activation_code);
      console.log("numbers", verifyNumber)
      console.log("Activation Token:", activationToken);
      const response = await activateUser(activation_code, activationToken);
      
      if (response) {
        router.push("/user/login");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.message);
        setInvalidError(true);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.log(error.message);
    }
    // setInvalidError(true);
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const testValue = /^\d{0,4}$/;
    /* make this work */
    /*  if (!testValue.test(value)) {
      return;
    } */
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    } else if (value.length === 1 && index === 3) {
      inputRefs[index].current?.blur();
      //verificationHandler();
    }
  };
  return (
    <div className=" w-full flex items-center justify-center h-screen">
      <div className="dark:bg-gray-900 bg-white rounded-md shadow-md dark:shadow-gray-900 shadow-gray-400 max-w-md w-full p-6 max-md:py-4 max-500:p-2 mx-2">
        <h2 className="dark:text-white text-purple-900 text-center text-2xl max-md:text-xl max-500:text-lg mb-2 font-bold max-md:font-semibold">
          Verify Account
        </h2>
        <div className="w-full flex justify-center mb-10">
          <div className="w-[60px] h-[60px] max-md:w-[50px] max-md:h-[50px] max-500:w-[45px] max-500:h-[45px] rounded-full bg-purple-900 flex items-center justify-center text-white">
            <VscWorkspaceTrusted size={30} />
          </div>
        </div>
        <div className="flex justify-around w-full mb-4">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              type="number"
              key={key}
              className={`w-[50px] h-[50px] max-500:w-[40px] max-500:h-[40px] bg-transparent border-[3px] text-black dark:text-white rounded-[10px] grid place-items-center text-[28px] focus:border-purple-700 focus:border ${invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"}`}
              ref={inputRefs[index]}
              value={verifyNumber[key as keyof verifyNumber]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              maxLength={1}
            />
          ))}
        </div>

        <div className="flex w-full justify-center">
          <button
            className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-purple-900 min-h-[45px] w-full text-base font-poppins font-semibold mt-5 text-white`}
            onClick={verificationHandler}
          >
            Verify OTP
          </button>
        </div>
        <br />
        <h5 className="text-center pt-4 font-poppins [14px] text-black dark:text-white">
          Go back to sign in?
          <span
            className="text-purple-900 hover:underline pl-1 cursor-pointer"
            onClick={() => router.push("/user/login")}
          >
            Sign in
          </span>
        </h5>
      </div>
    </div>
  );
}

/*
import { useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

interface IVerifyNumber {
    "0": string,
    "1": string,
    "2": string,
    "3": string,
}

export default function ActivateUser() {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<IVerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const handleChange = (index: number, value: string) => {
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus;
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus;
    }
  };

  return (
    <div className=" w-full flex items-center justify-center h-screen">
      <div className="dark:bg-gray-900 bg-white rounded-md shadow-md dark:shadow-gray-900 max-w-md w-full p-6 max-md:py-4 max-500:p-2 mx-2">
        <h2 className="dark:text-white text-purple-900 text-center text-2xl max-md:text-xl max-500:text-lg mb-2 font-bold max-md:font-semibold">
          Verify Account
        </h2>
        <div className="w-full flex justify-center mb-10">
        <div className="w-[60px] h-[60px] max-md:w-[50px] max-md:h-[50px] max-500:w-[45px] max-500:h-[45px] rounded-full bg-purple-900 flex items-center justify-center">
          <VscWorkspaceTrusted size={30} />
        </div>
        </div>
        <div className="flex justify-around w-full">

        {
            Object.keys(verifyNumber).map((key, index) => (
                <input type="number" key={key} className="w-[50px] h-[50px] max-500:w-[40px] max-500:h-[40px] bg-transparent border-[3px] text-black dark:text-white rounded-[10px] p-1" ref={inputRefs[index]}  value={verifyNumber[key as keyof verifyNumber]} onChange={(e) => handleChange(index, e.target.value)} maxLength={1} />
            ))
        }</div>
      </div>
    </div>
  );
}
 */
