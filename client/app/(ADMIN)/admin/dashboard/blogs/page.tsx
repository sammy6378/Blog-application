"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PencilIcon,
  TrashIcon,
  HeartIcon,
  MessageCircleIcon,
  TagIcon,
  LinkIcon,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Link from "next/link";
import { IBlog, useContextFunc } from "@/components/context/AppContext";
import Image from "next/image";
import OutsideClickHandler from "react-outside-click-handler";

/* export interface IBlogs {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: IComment[];
  tags: string[];
} */

/* const myBlogs = [
  {
    id: 1,
    title: "First Blog",
    content: "This is the first blog post.",
    likes: 10,
    comments: [
      {
        id: 1,
        content: "Great post!",
        replies: [
          {
            id: 2,
            content: "Thanks!",
            replies: [],
          },
        ],
      },
      {
        id: 3,
        content: "Nice job!",
        replies: [],
      },
    ],
    tags: ["React", "JavaScript"],
  },
  {
    id: 2,
    title: "Second Blog",
    content: "Another interesting post.",
    likes: 5,
    comments: [
      {
        id: 4,
        content: "Good one!",
        replies: [],
      },
    ],
    tags: ["Next.js", "Frontend"],
  },
]; */

function BlogPage() {
  const { blogs } = useContextFunc();
  const router = useRouter();
  const [linksOpen, setLinksOpen] = useState("");

  const handleCreateBlog = () => {
    router.push("/admin/dashboard/blogs/new"); // Navigate to blog creation page
  };

  const handleViewBlog = (blog: IBlog) => {
    router.push(`/admin/dashboard/blogs/${blog._id}`); // Navigate to the blog details page
  };
  /* 
  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter((blog) => blog.id !== id)); // Delete the blog
  }; */

  return (
    <div className="p-8 max-w-4xl mx-auto mb-[80px] max-700:mb-[150px]">
      <div className="mb-6">
        <Link
          href={"/admin/dashboard/blogs/new"}
          onClick={handleCreateBlog}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Blog
        </Link>
      </div>

      {/* Blog List */}
      {blogs?.map((blog) => (
        <div
          key={blog._id}
          className="border rounded-lg p-4 mb-4 shadow-md relative"
        >
          <div className="flex items-center justify-between  mb-4">
            <Image
              src={`${blog?.author.avatar.url}`}
              alt="admin-avatar"
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full border dark:shadow-none shadow-md"
            />
            <p className="text-gray-500">
              <span className="max-500:hidden">Created By:</span>{" "}
              {blog?.author.email}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <div className="flex gap-3">
              <button
                onClick={() => handleViewBlog(blog)}
                className="text-blue-500 hover:text-blue-700"
              >
                View Blog
              </button>
              {/*  <button
                onClick={() => handleDeleteBlog(blog.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon size={20} />
              </button> */}
            </div>
          </div>
          <p className="text-gray-700 mt-2">{blog.description}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-3">
              <button className="flex items-center text-gray-600 hover:text-red-500">
                <ThumbsUp size={18} className="mr-1" /> {blog.likes}
              </button>
              <button className="flex items-center text-gray-600 hover:text-red-500">
                <ThumbsDown size={18} className="mr-1" /> {blog.dislikes}
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-500">
                <MessageCircleIcon size={18} className="mr-1" />
                {blog.comments.length}
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {blog.tags && blog.tags.length > 0 ? (
                blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-teal-500 rounded-md flex items-center gap-1"
                  >
                    <TagIcon size={14} />{" "}
                    {tag.length > 10 ? tag.slice(0, 10) + "..." : tag}
                  </span>
                ))
              ) : (
                <p className="dark:text-gray-600 text-gray-400">No Tags</p>
              )}
              {/* links */}
              {linksOpen === blog?._id ? (
                <OutsideClickHandler onOutsideClick={() => setLinksOpen("")}>
                  <div className="absolute bottom-2 right-[5px] border z-10 dark:bg-gray-800 bg-gray-200 w-fit p-2 px-4 rounded-md shadow-md">
                    {blog?.links && blog?.links.length > 0 ? (
                      <div className="flex flex-col">
                        {blog.links.map((link, index) => (
                          <Link
                            href={link}
                            key={index}
                            className="whitespace-nowrap"
                            onClick={() => setLinksOpen("")}
                          >
                            {link}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="dark:text-gray-600 text-gray-400">
                        No Links
                      </div>
                    )}
                  </div>
                </OutsideClickHandler>
              ) : (
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setLinksOpen(blog?._id)}
                >
                  <LinkIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogPage;
