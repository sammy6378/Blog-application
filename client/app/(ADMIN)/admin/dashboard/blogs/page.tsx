"use client";

import React, {  useState } from "react";
import { useRouter } from "next/navigation";
import {
  PencilIcon,
  TrashIcon,
  HeartIcon,
  MessageCircleIcon,
  TagIcon,
  LinkIcon,
} from "lucide-react";

export interface IComment {
  id: number;
  content: string;
  replies: IComment[];
}

export interface IBlogs {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: IComment[];
  tags: string[];
}

export const myBlogs = [
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
];

function BlogPage() {
  const router = useRouter();

  const [blogs, setBlogs] = useState<IBlogs[]>(myBlogs);

  const [selectedBlog, setSelectedBlog] = useState<IBlogs | null>(null);

  const handleCreateBlog = () => {
    setSelectedBlog(null); // Reset selected blog for creation
  };

  const handleEditBlog = (blog: IBlogs) => {
    router.push(`/admin/dashboard/blogs/${blog.id}`); // Navigate to the blog details page
  };

  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter((blog) => blog.id !== id)); // Delete the blog
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={handleCreateBlog}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Create New Blog
      </button>

      {/* Blog List */}
      {blogs.map((blog) => (
        <div key={blog.id} className="border rounded-lg p-4 mb-4 shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <div className="flex gap-3">
              <button
                onClick={() => handleEditBlog(blog)}
                className="text-blue-500 hover:text-blue-700"
              >
                <PencilIcon size={20} />
              </button>
              <button
                onClick={() => handleDeleteBlog(blog.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon size={20} />
              </button>
            </div>
          </div>
          <p className="text-gray-700 mt-2">{blog.content}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-3">
              <button className="flex items-center text-gray-600 hover:text-red-500">
                <HeartIcon size={18} className="mr-1" /> {blog.likes}
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-500">
                <MessageCircleIcon size={18} className="mr-1" />{" "}
                {blog.comments.length}
              </button>
            </div>
            <div className="flex gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm bg-teal-500 rounded-md flex items-center gap-1"
                >
                  <TagIcon size={14} /> {tag}
                </span>
              ))}
              <button className="text-gray-500 hover:text-gray-700">
                <LinkIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogPage;