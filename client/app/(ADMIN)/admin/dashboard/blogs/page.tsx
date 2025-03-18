
"use client"

import React, { useState } from "react";
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

function BlogPage() {
   
      
    const [blogs, setBlogs] = useState<IBlogs[]>([
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
      ]);
      

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlogs | null>(null);

  const handleCreateBlog = () => {
    setSelectedBlog(null); // Reset selected blog for creation
    setIsFormVisible(true); // Show the form
  };

  const handleEditBlog = (blog:IBlogs) => {
    setSelectedBlog(blog); // Set the selected blog for editing
    setIsFormVisible(true); // Show the form
  };

  const handleDeleteBlog = (id:number) => {
    setBlogs(blogs.filter((blog) => blog.id !== id)); // Delete the blog
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newBlog: IBlogs = {
      id: selectedBlog ? selectedBlog.id : Date.now(), // Use existing ID for edit or new ID for create
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      likes: selectedBlog ? selectedBlog.likes : 0, // Preserve likes for edit
      comments: selectedBlog ? selectedBlog.comments : [], // Preserve comments for edit
      tags: formData.get("tags")?.toString().split(",") || [], // Convert tags string to array
    };

    if (selectedBlog) {
      // Update existing blog
      setBlogs(blogs.map((blog) => (blog.id === selectedBlog.id ? newBlog : blog)));
    } else {
      // Add new blog
      setBlogs([...blogs, newBlog]);
    }

    setIsFormVisible(false); // Hide the form
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
                <MessageCircleIcon size={18} className="mr-1" /> {blog.comments.length}
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

      {/* Form Overlay */}
    {isFormVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center p-4 z-[10000]">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">
        {selectedBlog ? "Edit Blog" : "Create Blog"}
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={selectedBlog ? selectedBlog.title : ""}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Content</label>
          <textarea
            name="content"
            defaultValue={selectedBlog ? selectedBlog.content : ""}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows={6}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tags</label>
          <input
            type="text"
            name="tags"
            defaultValue={selectedBlog ? selectedBlog.tags.join(",") : ""}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Comma-separated tags"
            required
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsFormVisible(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {selectedBlog ? "Save Changes" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default BlogPage;