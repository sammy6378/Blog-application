"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MessageCircle,
  ThumbsUp,
  PlusCircle,
  ArrowLeft,
  Trash,
  Trash2,
  Trash2Icon,
  Edit2Icon,
} from "lucide-react";
import { IBlog, useContextFunc } from "@/components/context/AppContext";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function BlogDetails() {
  const { blogs } = useContextFunc();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [blog, setBlog] = useState<IBlog | null>(null);
  /*   const [editedBlog, setEditedBlog] = useState<IBlog | null>(null);
  const [isModified, setIsModified] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [newTag, setNewTag] = useState<string>(""); */

  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.description);
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [tags, setTags] = useState([]);
  const [links, setLinks] = useState<string[]>([]);
  const [addLink, setAddLink] = useState(false);
  //markdown
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  //videos
  const [videos, setVideos] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState({});
  const [videoLinks, setVideoLinks] = useState([]);

  useEffect(() => {
    if (id) {
      const foundBlog = blogs?.find((b) => b._id.toString() === id);
      setBlog(foundBlog || null);

      if (foundBlog) {
        setTitle(foundBlog.title);
        setDescription(foundBlog.description);
        setBody(foundBlog.body);
        setCategory(foundBlog.category);
        setLinks(foundBlog.links);
      }
      console.log("found blog: ", foundBlog);
    }
  }, [id, blogs]);

  useEffect(() => {
    console.log(links);
  }, [links]);

  //delete entire blog
  const handleDeleteBlog = async () => {};

  if (blog === null) {
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        Blog not found!
      </p>
    );
  }

  const handleEditLink = (e: any, index: number) => {
    const updatedLinks = [...links];
    updatedLinks[index] = e.target.value;
    setLinks(updatedLinks);
  };

  const addNewLink = (e: any) => {
    if (e.key === "Enter") {
      setLinks([...links, e.target.value]);
      setAddLink(false);
    }
    e.target.value === "";
  };

  return (
    <section className="mb-[80px] max-700:mb-[150px] p-6 max-w-3xl mx-auto overflow-y-auto font-poppins">
      <header className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
        >
          ← Go Back
        </button>
        <button
          title="delete blog"
          onClick={() => handleDeleteBlog()}
          className="flex items-center gap-1 border-[1.5px] p-2 rounded shadow-inner shadow-crimson bg-opacity-50 border-crimson hover:bg-red-500/50 transition-all group"
        >
          <span> Delete Blog </span>
          <Trash2Icon
            size={14}
            fill="transparent"
            className="text-crimson group-hover:text-white"
          />
        </button>
      </header>

      <div className="dark:border-none border shadow dark:shadow-slate-600 shadow-slate-400 p-4 rounded-md mb-4 relative mt-5">
        <h1 className="text-xl 700:text-2xl font-semibold">Edit Blog</h1>
        <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
          {/* Blog Title */}
          <div className="flex flex-col gap-1">
            <label htmlFor="blogTitle">Blog Title: </label>
            <input
              type="text"
              placeholder="Blog Title"
              id="blogTitle"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
            />
          </div>
          {/* Blog Description */}
          <div className="flex flex-col gap-1">
            <label htmlFor="blogDescription">Blog Description: </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
              placeholder="Blog Description"
            ></textarea>
          </div>

          {/* body */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="blogBody"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Blog Body:
            </label>
            <ReactMde
              value={body}
              onChange={setBody}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
              }
              childProps={{
                writeButton: {
                  //  className: "bg-blue-500 dark:text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all",
                },
              }}
              classes={{
                reactMde:
                  "border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800",
                toolbar: "bg-gray-100 dark:bg-gray-900",
                preview:
                  "p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100",
                textArea:
                  "p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded focus:outline focus:outline-slate-800",
              }}
            />
          </div>

          {/* category */}
          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="blogCategory">Category: </label>
            <input
              type="text"
              placeholder="Blog Category"
              id="blogCategory"
              value={category}
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
            />
          </div>

          {/* links */}
          <div>
            <label htmlFor="links">Links: </label>
            {links && links.length > 0 ? (
              <div>
                <div className="flex gap-2 flex-wrap">
                  {links.map((link, index) => (
                    <input
                      type="text"
                      key={index}
                      defaultValue={link}
                      /* onChange={(e) => setLinks([...links, e.target.value])} */
                      onKeyDown={(e) => handleEditLink(e, index)}
                      className=" p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md w-fit"
                    />
                  ))}
                </div>
                <div
                  className="flex items-center gap-1"
                  onClick={() => setAddLink(true)}
                >
                  <PlusCircle className="hover:dark:text-green hover:text-crimson cursor-pointer transition-all" />{" "}
                  <span className="text-xs">Add Link</span>
                </div>
              </div>
            ) : (
              <div
                className="flex items-center gap-1"
                onClick={() => setAddLink(true)}
              >
                <PlusCircle className="hover:dark:text-green hover:text-crimson cursor-pointer transition-all" />
                <span className="text-xs">Add Link</span>
              </div>
            )}
          </div>
          {/* Add Link */}
          {addLink && (
            <div>
              <input
                type="text"
                className="p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md w-fit"
                onKeyDown={addNewLink}
              />
            </div>
          )}

          {/* submit button */}
          <button
            type="submit"
            className="flex items-center place-self-end mt-5 gap-1 border-[1.5px] p-2 rounded shadow-inner shadow-green bg-opacity-50 border-green hover:bg-emerald-200/50 transition-all group"
          >
            <span> Update Blog </span>
            <Edit2Icon
              size={14}
              fill="transparent"
              className="text-green group-hover:text-white"
            />
          </button>
        </form>
      </div>
    </section>
  );

  /* const handleInputChange = (field: keyof IBlog, value: any) => {
    setEditedBlog({ ...editedBlog, [field]: value } as IBlog);
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
        value={blog.body}
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
                {comment.replies.map((reply: any) => (
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

 */
}
