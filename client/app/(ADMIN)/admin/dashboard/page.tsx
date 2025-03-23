"use client";
import { useContextFunc } from "@/components/context/AppContext";
import AdminProtected from "@/components/utils/protected/AdminProtected";
import Protected from "@/components/utils/protected/Protected";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const { userInfo, userTotal, blogCount, blogs } = useContextFunc();
  const [greeting, setGreeting] = useState("");
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [topBlogs, setTopBlogs] = useState<any>([]);

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

  useEffect(() => {
    fetchBlogItems();
    console.log(blogs?.length)
  }, [blogs])

  const fetchBlogItems = () => {
    if(!blogs || blogs.length === 0) return;

    //sum up all likes
    const totalLikesCount = blogs?.reduce((acc: number, blog: any) => acc + blog.likes, 0);
    setTotalLikes(totalLikesCount as number);

    //dislikes
    const totalDislikesCount = blogs?.reduce((acc: number, blog: any) => acc + blog.dislikes, 0);
    setTotalDislikes(totalDislikesCount as number);

    //rating
    const totalRating = blogs?.reduce((acc: number, blog: any) => acc + blog.rating, 0);
    const averageRating = blogs.length > 0 ? totalRating / blogs.length : 0;
    setAverageRating(averageRating);
    

    //sum up all comments
    const totalComments = blogs.reduce((acc: number, blog: any) => acc + blog.comments.length, 0);
    setTotalComments(totalComments);
  }

  return (
    <Protected>
      <AdminProtected>
        <div className="p-8 mb-[80px] max-700:mb-[150px]">
          <h1 className="text-center font-bold text-2xl max-500:text-xl max-300px:text-lg font-josefin">
            Good {greeting} Admin{" "}
            <span className="dark:text-green text-crimson">
              <br />
              {userInfo?.name || ""}!
            </span>
          </h1>
          {/* Admin Notifications */}
          <section className="mt-8 mb-2">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-md shadow">
                <p className="text-sm">
                  User verification request from{" "}
                  <span className="font-semibold">Jane Doe</span>
                </p>
              </div>
              <div className="p-4 bg-red-100 dark:bg-red-900 rounded-md shadow">
                <p className="text-sm">
                  Flagged comment on blog:{" "}
                  <span className="font-semibold">"React Best Practices"</span>
                </p>
              </div>
            </div>
          </section>
          {/* display total users and blogs */}
          <section className="flex items-center justify-between 700:justify-center 800:gap-[25%] gap-[20px] my-[50px] max-500:flex-col">
            {/* users */}
            <div className="flex flex-col items-center justify-center w-[180px] h-[150px] 800:w-[250px] 800:h-[150px] dark:bg-gray-900 bg-gray-100 rounded-md text-3xl 700:text-3xl 500:text-2xl font-semibold gap-[15px] dark:text-white shadow shadow-gray-400 dark:shadow-gray-700 hover:shadow-sm hover:-translate-y-1 transition-all max-500:w-full">
              <span>Users</span>
              <span className="dark:text-green text-crimson">
                {userTotal || 0}
              </span>
            </div>

            {/* blogs */}
            <div className="flex flex-col items-center justify-center w-[180px] h-[150px] 800:w-[250px] 800:h-[150px] dark:bg-gray-900 bg-gray-100 rounded-md text-3xl 700:text-3xl 500:text-2xl font-semibold gap-[15px] dark:text-white shadow shadow-gray-400 dark:shadow-gray-700 hover:shadow-sm hover:-translate-y-1 transition-all max-500:w-full">
              <span>Blogs</span>
              <span className="dark:text-green text-crimson">
                {blogCount || 0}
              </span>
            </div>
          </section>

          {/* Recent Activities */}
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow">
                <p className="text-sm">
                  New user registered:{" "}
                  <span className="font-semibold">John Doe</span>
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow">
                <p className="text-sm">
                  New blog post:{" "}
                  <span className="font-semibold">"How to Learn React"</span>
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </section>
          {/* Blog statistics */}
          <section className="mt-8 grid grid-cols-1 700:grid-cols-2 800:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center w-full h-[150px] bg-gray-100 dark:bg-gray-900 rounded-md text-2xl font-semibold gap-2 dark:text-white shadow hover:shadow-md transition-all">
              <span>Total Likes</span>
              <span className="dark:text-green text-crimson">
                {totalLikes || 0}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[150px] bg-gray-100 dark:bg-gray-900 rounded-md text-2xl font-semibold gap-2 dark:text-white shadow hover:shadow-md transition-all">
              <span>Total Comments</span>
              <span className="dark:text-green text-crimson">
                {totalComments || 0}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[150px] bg-gray-100 dark:bg-gray-900 rounded-md text-2xl font-semibold gap-2 dark:text-white shadow hover:shadow-md transition-all">
              <span>Average Rating</span>
              <span className="dark:text-green text-crimson">
                {averageRating || 0}
              </span>
            </div>
          </section>
          {/* Quick Actions */}
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="flex gap-4 max-500:flex-col">
              <Link href={'/admin/dashboard/blogs/create-blog'} className="px-4 py-2 dark:bg-white bg-slate-100 dark:text-black shadow-sm shadow-slate-600  rounded-md hover:bg-green-600 hover:dark:bg-slate-200 hover:bg-slate-200 transition">
                Create New Blog
              </Link>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Manage Users
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                View Reports
              </button>
            </div>
          </section>
          {/* Top Blogs */}
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">Top Blogs</h2>
            <div className="flex flex-col gap-4">
              {topBlogs.map((blog: any) => (
                <div
                  key={blog._id}
                  className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md shadow"
                >
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-500">
                    Likes: {blog.likes} | Comments: {blog.comments.length}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </AdminProtected>
    </Protected>
  );
}
export default Page;
