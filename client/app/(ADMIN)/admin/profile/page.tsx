"use client";
import { FaCamera } from "react-icons/fa";
import { EditIcon, MailWarningIcon } from "lucide-react";

import { useContextFunc } from "@/components/context/AppContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { VscWarning } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import UpdateForm from "./UpdateForm";
import UpdatePass from "./UpdatePass";
import {
  updateAvatar,
  updateInfo,
  updatePassword,
} from "@/components/services/userService";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { getUserInfo } from "@/components/services/authService";
import Protected from "@/components/utils/protected/Protected";
import "@/app/app.css";
import AdminProtected from "@/components/utils/protected/AdminProtected";

export default function Profile() {
  const { userInfo, loadingContext, accessToken, handleLogout } =
    useContextFunc();
  const [info, setInfo] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);
  const { data } = useSession();
  const router = useRouter();
  const [name, setName] = useState((userInfo && userInfo?.name) || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showReadonlyMessage, setShowReadonlyMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = async (e: any) => {
    //const file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;

        try {
          const response = await updateAvatar(avatar as string);
          if (response.success) {
            toast.success(response.message);
            const userResponse = await getUserInfo();
            if (userResponse.success) {
              window.location.reload();
            }
          } else {
            console.log(response.message);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.response?.data.message);
          } else {
            console.log("An unexpected error occured when uploading image");
          }
        }
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const submitInfo = async (e: React.FormEvent) => {
    //setInfo(false);
    e.preventDefault();
    try {
      const response = await updateInfo({ name });
      if (response.success) {
        toast.success(response.message);
        const userResponse = await getUserInfo();
        if (userResponse.success) {
          setInfo(false);
          window.location.reload();
        }
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        setErrorMessage(error.response?.data.message);
      } else {
        console.log("An unexpected error occurred");
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    //setShowPassForm(false)
    try {
      const response = await updatePassword({ oldPassword, newPassword });
      if (response.success) {
        if (
          window.confirm(
            "Are you sure you want to change your password? You will need to login again"
          )
        ) {
          toast.success(response.message);
          setShowPassForm(false);
          await handleLogout();
          const userResponse = await getUserInfo();
          if (userResponse) {
            // window.location.reload();
            router.push("/user/login");
          }
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "An unexpected error occurred"
        );
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  return (
    <Protected>
      <AdminProtected>
        <section className="w-full min-h-screen flex items-center flex-col max-500:items-start justify-center font-poppins mb-4">
          <h1 className="font-medium text-lg">Admin Profile</h1>
          <div className="dark:bg-slate-800 bg-slate-100 dark:text-white text-slate-900 h-1/2 w-[600px] max-w-[90%] flex flex-col items-center justify-center p-3 mt-4 rounded-md shadow">
            <section className="relative">
              <Image
                src={
                  userInfo?.avatar?.url || data?.user?.image || "/profile.webp"
                }
                alt="avatar"
                width={30}
                height={30}
                className="w-[100px] h-[100px] max-500:w-[80px] max-500:h-[80px] max-300px:w-[60px] max-300px:h-[60px] rounded-full object-cover"
                unoptimized
                priority
              />

              <input
                type="file"
                name="avatar"
                id="avatar"
                className="hidden"
                accept="image/png, image/jpeg, image/webp, image/jpg, image/svg"
                onChange={handleImageChange}
              />
              <label htmlFor="avatar">
                <div className="dark:bg-slate-800 bg-slate-100 w-[25px] h-[25px] rounded-full absolute bottom-2 right-2 flex items-center justify-center">
                  <FaCamera className="  cursor-pointer" size={20} />
                </div>
              </label>
            </section>
            {/* name and email */}
            {info ? (
              <UpdateForm
                name={name}
                setName={setName}
                showReadonlyMessage={showReadonlyMessage}
                setShowReadonlyMessage={setShowReadonlyMessage}
                submitInfo={submitInfo}
              />
            ) : userInfo ? (
              <section className="mt-8 flex flex-col gap-2 dark:shadow border border-slate-500 dark:border-slate-300 rounded-md p-2 py-4 w-[90%] max-500:w-full items-center relative mb-4">
                <p className="font-semibold">{userInfo?.name}</p>
                <hr className="w-[80%] h-[1px] max-500:w-full bg-gray-400 dark:w-0" />
                <p className="dark:text-gray-400 text-gray-700">
                  {userInfo?.email}
                </p>
                <div
                  className="absolute -bottom-2 right-2 cursor-pointer dark:bg-slate-800 bg-white"
                  onClick={() => setInfo(true)}
                  title="edit profile info"
                >
                  <EditIcon size={20} />
                </div>
              </section>
            ) : (
              <div className="user-info mt-8 flex flex-col gap-2 dark:shadow border border-slate-500 dark:border-slate-300 rounded-md p-2 py-4 w-[90%] max-500:w-full items-center relative mb-4">
                <p className="user-info-p dark:bg-gray-200"></p>
                <p className="user-info-p dark:bg-gray-200"></p>
              </div>
            )}

            {showPassForm ? (
              <UpdatePass
                showPassForm={showPassForm}
                handleSubmitPassword={handleSubmitPassword}
                setOldPassword={setOldPassword}
                setNewPassword={setNewPassword}
                oldPassword={oldPassword}
                newPassword={newPassword}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            ) : (
              <button
                className="mt-8 flex flex-col gap-2 dark:shadow rounded-md p-2 py-4 w-[90%] max-500:w-full items-center relative mb-4 bg-[#37a39a] hover:opacity-90 transition"
                onClick={() => setShowPassForm(true)}
              >
                Update Password
              </button>
            )}

            {/* Delete Account */}

            <button className="flex flex-row justify-center gap-2 dark:shadow border-2 border-crimson text-crimson rounded-md p-2 py-4 w-[90%] max-500:w-full items-center relative mb-4 hover:bg-[crimson]/50 transition hover:text-white mt-4">
              <span className="place-self-center">Delete Account</span>
              <VscWarning className="absolute left-2" size={25} />
            </button>
          </div>
        </section>
      </AdminProtected>
    </Protected>
  );
}
