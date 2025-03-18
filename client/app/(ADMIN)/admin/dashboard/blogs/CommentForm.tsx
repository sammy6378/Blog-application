import React, { useState } from "react";
import { MessageCircleIcon, ReplyIcon } from "lucide-react";

interface IComment {
  id: number;
  content: string;
  replies: IComment[];
}

interface CommentFormProps {
  comments: IComment[];
  selectedComment: IComment | null;
  onClose: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ comments, selectedComment, onClose }) => {
  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: boolean }>({}); // Track which comment has an open reply input
  const [replies, setReplies] = useState<{ [key: number]: string }>({}); // Track reply content for each comment

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    // Add the new comment to the list (this is just a placeholder; you need to update the state in the parent component)
    console.log("New Comment:", newComment);
    setNewComment("");
  };

  const handleReply = (commentId: number) => {
    if (replies[commentId]?.trim() === "") return;

    // Add the reply to the comment (this is just a placeholder; you need to update the state in the parent component)
    console.log("Reply to Comment ID:", commentId, "Content:", replies[commentId]);
    setReplies((prev) => ({ ...prev, [commentId]: "" })); // Clear the reply input
    setReplyInputs((prev) => ({ ...prev, [commentId]: false })); // Close the reply input
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center p-4 z-[10000]">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-200">Comments</h2>

        {/* Display Comments */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-l-2 pl-4 border-gray-200 dark:border-gray-600">
              <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>

              {/* Reply Button */}
              <button
                onClick={() =>
                  setReplyInputs((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))
                }
                className="flex items-center text-gray-500 hover:text-blue-500 mt-2"
              >
                <ReplyIcon size={16} className="mr-1" /> Reply
              </button>

              {/* Reply Input (Conditional) */}
              {replyInputs[comment.id] && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={replies[comment.id] || ""}
                    onChange={(e) =>
                      setReplies((prev) => ({ ...prev, [comment.id]: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write a reply..."
                  />
                  <button
                    onClick={() => handleReply(comment.id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit Reply
                  </button>
                </div>
              )}

              {/* Display Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-4 mt-2 space-y-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="border-l-2 pl-4 border-gray-200 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-400">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CommentForm;