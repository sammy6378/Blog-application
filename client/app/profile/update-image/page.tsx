"use client";

import { useContextFunc } from "@/components/context/AppContext";
import { updateAvatar } from "@/components/services/userService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateAvatar() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  const { loadingContext, accessToken } = useContextFunc();
  const router = useRouter();

  useEffect(() => {
    if (!loadingContext && accessToken === null) {
      router.push("/user/login");
    }
  }, [accessToken, loadingContext, router]);

  if (loadingContext) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!base64) {
        toast.error("No image selected or base64 conversion failed");
        return;
      }
      // Send the base64 string to your service
      const response = await updateAvatar(base64);
      if (response.success) {
        toast.success(response.message);
        router.back();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Error on avatar update");
    }
  };

  return (
    <form onSubmit={submitAvatar}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Update Avatar</button>
    </form>
  );
}
