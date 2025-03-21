"use client";
import { useContextFunc } from "@/components/context/AppContext";
import AdminProtected from "@/components/utils/protected/AdminProtected";
import Protected from "@/components/utils/protected/Protected";
import React, { useEffect, useState } from "react";

function Page() {
  const { userInfo, userTotal } = useContextFunc();
  const [greeting, setGreeting] = useState("");

  const hour = new Date().getHours();
  useEffect(() => {
    if (hour > 5 && hour <= 12) {
      setGreeting("Morning");
    } else if (hour > 12 && hour <= 16) {
      setGreeting("Afternoon");
    } else if (hour > 16 && hour < 21) {
      setGreeting("Evening");
    } else {
      setGreeting("Night");
    }
  }, [hour]);

  return (
    <Protected>
    <AdminProtected>
    <div className="p-8">
      <h1 className="text-center font-bold text-2xl max-500:text-xl max-300px:text-lg font-josefin">
        Good {greeting} Admin{" "}
        <span className="dark:text-green text-crimson">
          <br />{userInfo?.name || ""}!
        </span>
      </h1>

      <section>
        <div>
          <span>Users</span>
          <span>{userTotal || 0}</span>
        </div>
      </section>
    </div>
    </AdminProtected>
    </Protected>
  );
}
export default Page;
