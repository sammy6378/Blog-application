"use client";

import React, { useEffect, useState } from "react";
import { IBlogs } from "../page";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import { myBlogs } from "../page";
import { MessageCircle, ThumbsUp, PlusCircle, ArrowLeft } from "lucide-react"; // Import icons

const BlogDetails: React.FC = () => {
  const router = useRouter(); // Initialize router
  const params = useParams();
  const id = params?.id;
  
  const [blog, setBlog] = useState<IBlogs | null>(null);
  const [editedBlog, setEditedBlog] = useState<IBlogs | null>(null);
  const [isModified, setIsModified] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [newTag, setNewTag] = useState<string>("");

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
        ? { 
            ...comment, 
            replies: [...comment.replies, { id: Date.now(), content: replyContent, replies: [] }] 
          }
        : comment
    );
    setEditedBlog({ ...blog, comments: updatedComments });
    setReplyingTo(null);
    setReplyContent("");
    setIsModified(true);
  };

  const handleAddTag = () => {
    if (!blog || !newTag.trim()) return;
    setEditedBlog({ ...blog, tags: [...blog.tags, newTag] });
    setNewTag("");
    setIsModified(true);
  };

  if (!blog) {
    return <p className="text-center text-red-500 text-lg font-semibold">Blog not found!</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mb-20 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      {/* Go Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold mb-4"
      >
        <ArrowLeft size={20} />
        Go Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Blog Details</h1>
      
      <input
        type="text"
        value={blog.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Blog Title"
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 text-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        value={blog.content}
        onChange={(e) => handleInputChange("content", e.target.value)}
        placeholder="Blog Content"
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 text-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
      />

      <div>
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Tags</h2>
        <div className="flex flex-wrap gap-2">
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag..."
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleAddTag} className="text-blue-500 hover:text-blue-600">
            <PlusCircle size={24} />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Comments</h2>
        
        {blog.comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-lg shadow-sm mb-4 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-blue-500 hover:text-blue-600"
              >
                <MessageCircle size={20} />
              </button>
              <button className="text-green-500 hover:text-green-600">
                <ThumbsUp size={20} />
              </button>
            </div>

            {replyingTo === comment.id && (
              <div className="mt-3">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleReply(comment.id)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Submit Reply
                </button>
              </div>
            )}

            {comment.replies.length > 0 && (
              <div className="mt-3 ml-6 border-l-2 border-gray-300 dark:border-gray-700 pl-3">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Replies:</h4>
                {comment.replies.map((reply) => (
                  <p key={reply.id} className="mt-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                    {reply.content}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {isModified && (
        <button
          onClick={() => alert("Blog updated!")}
          className="bg-green-500 text-white px-5 py-2 rounded-lg mt-6 hover:bg-green-600 transition-all"
        >
          Update Blog
        </button>
      )}
    </div>
  );
};

export default BlogDetails;
