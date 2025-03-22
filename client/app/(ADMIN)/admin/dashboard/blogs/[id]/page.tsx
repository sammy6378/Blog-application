"use client";

import React, { useEffect, useState } from "react";
import { IBlogs } from "../page";
import { useParams } from "next/navigation";
import { myBlogs } from "../page";

const BlogDetails: React.FC = () => {
  const params = useParams(); // Correctly retrieve params object
  const id = params?.id; // Safely extract the id parameter

  const [blog, setBlog] = useState<IBlogs | null>(null);
  const [editedBlog, setEditedBlog] = useState<IBlogs | null>(null);
  const [isModified, setIsModified] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // Track which comment is being replied to
  const [replyContent, setReplyContent] = useState<string>("");

  useEffect(() => {
    if (id) {
      const foundBlog = myBlogs.find((b) => b.id.toString() === id);
      setBlog(foundBlog || null);
    }
  }, [id]);

  const handleInputChange = (field: keyof IBlogs, value: any) => {
    setEditedBlog({ ...editedBlog, [field]: value } as IBlogs);
    setIsModified(true);
  };

  const handleReply = (commentId: number) => {
    if (!blog || !replyContent.trim()) return;
    const updatedComments = blog.comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, { id: Date.now(), content: replyContent, replies: [] }] }
        : comment
    );
    setEditedBlog({ ...blog, comments: updatedComments });
    setReplyingTo(null);
    setReplyContent("");
    setIsModified(true);
  };

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found!</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto mb-[80px] max-700:mb-[150px]">
      <h1 className="text-2xl font-bold mb-4">Blog Details</h1>
      <input
        type="text"
        value={blog.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Blog Title"
        className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-900"
      />
      <textarea
        value={blog.content}
        onChange={(e) => handleInputChange("content", e.target.value)}
        placeholder="Blog Content"
        className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-900"
      />
      <div>
        <h2 className="text-xl font-semibold mb-2">Tags</h2>
        {blog.tags.map((tag, index) => (
          <input
            key={index}
            type="text"
            value={tag}
            onChange={(e) => {
              const updatedTags = [...blog.tags];
              updatedTags[index] = e.target.value;
              handleInputChange("tags", updatedTags);
            }}
            className="w-full p-2 border border-gray-300 rounded mb-2 dark:bg-gray-900"
          />
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-4 mb-2">Comments</h2>
        {blog.comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <p className="mb-2">{comment.content}</p>
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-blue-500 underline"
            >
              Reply
            </button>
            {replyingTo === comment.id && (
              <div className="mt-2">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full p-2 border border-gray-300 rounded mb-2 dark:bg-gray-900"
                />
                <button
                  onClick={() => handleReply(comment.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit Reply
                </button>
              </div>
            )}
            {comment.replies.length > 0 && (
              <div className="ml-4 mt-2">
                <h4 className="font-semibold">Replies:</h4>
                {comment.replies.map((reply) => (
                  <p key={reply.id} className="ml-2">{reply.content}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {isModified && (
        <button
          onClick={() => alert("Blog updated!")}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Update Blog
        </button>
      )}
    </div>
  );
};

export default BlogDetails;