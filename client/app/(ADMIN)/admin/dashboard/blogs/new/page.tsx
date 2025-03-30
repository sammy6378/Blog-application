"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { X } from "lucide-react";
import OutsideClickHandler from "react-outside-click-handler";

interface IVideo {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: string;
  links: string[];
}

const CreateBlog = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [blogThumbnail, setBlogThumbnail] = useState("");
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [links, setLinks] = useState<string[]>([]);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [videoLinks, setVideoLinks] = useState<string[]>([]);

  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
  const [videoModal, setVideoModal] = useState(false);

  useEffect(() => {
    console.log("videos: ", videos);
  }, [videos]);

  const handleSaveBlog = () => {
    /*  if (!title.trim() || !description.trim() || !body.trim()) {
      alert("Title, description, and body cannot be empty."); 
      return;
    }

    const newBlog = {
      title,
      description,
      body,
      category,
      tags,
      thumbnail,
      videos,
      links,
    };

    console.log("Saving blog:", newBlog);
    alert("Blog saved!");

    router.push("/admin/dashboard/blogs"); */
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const thumbnail = fileReader.result as string;
        setBlogThumbnail(thumbnail);
      }
    };
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleVideoThumbnailUpload = (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const thumbnail = fileReader.result as string;
        setVideoThumbnail(thumbnail);
      }
    };
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = (event.target as HTMLInputElement).value.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        (event.target as HTMLInputElement).value = "";
      }
    }
  };

  const handleAddVideo = (e: React.FormEvent<HTMLFormElement>) => {
    /*   const videoUrl = prompt("Enter video URL:");
    if (videoUrl) setVideos([...videos, videoUrl]); */
    e.preventDefault();
    setVideoModal(false);
  };

  const handleAddLink = () => {
    const linkUrl = prompt("Enter external link URL:");
    if (linkUrl) setLinks([...links, linkUrl]);
  };

  const handleVideoLinks = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newLink: string = (e.target as HTMLInputElement).value.trim();
      if (!videoLinks.includes(newLink)) {
        setVideoLinks([...videoLinks, newLink]);
      }
      e.target.value = "";
    }
  };

  const handleRemoveVideoLink = (index: number) => {
    const updatedLinks = videoLinks.filter((_, i) => i !== index);
    setVideoLinks(updatedLinks);
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleSubmitVideo = () => {
    if (Array.isArray(videos)) {
      setVideos((videos: IVideo[]) => [
        ...videos,
        {
          title: videoTitle,
          description: videoDescription,
          videoUrl: videoUrl,
          videoThumbnail,
          links: videoLinks,
        },
      ]);
    }
    setVideoTitle("");
    setVideoDescription("");
    setVideoUrl("");
    setVideoLinks([]);
  };

  return (
    <div className="mb-[80px] max-700:mb-[150px] p-6 max-w-3xl mx-auto overflow-y-auto font-poppins ">
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
        >
          ← Go Back
        </button>
      </div>
      <div className="dark:border-none border shadow dark:shadow-slate-600 shadow-slate-400 p-4 rounded-md mb-4 relative">
        <form>
          <div className="flex items-center justify-end">
            <h1 className="text-[28px] max-700:text-2xl max-500:text-xl font-bold mb-6 dark:text-white">
              Create New Blog
            </h1>
          </div>
          {/* Blog Title */}
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
          />
          {/* Description */}
          <textarea
            placeholder="Short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
          />{" "}
          {/* Body */}
          <div className="dark:bg-gray-900 mb-5 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg">
            <ReactMde
              value={body}
              onChange={setBody}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(
                  <div className="p-4 dark:bg-gray-800 dark:text-white rounded-lg">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                  </div>
                )
              }
            />
          </div>
          {/* Category Selection */}
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
          />
          {/* Thumbnail Upload */}
          <div className="my-5">
            <label
              htmlFor="blog-thumbnail"
              className="block text-gray-700 dark:text-white mb-2"
            >
              Upload Thumbnail
            </label>
            <input
              type="file"
              name="videoThumbnail"
              id="blog-thumbnail"
              accept="image/*"
              onChange={handleThumbnailUpload}
            />
            {/*      {thumbnail.url && (
              <img
                src={thumbnail.url}
                alt="Thumbnail"
                className="mt-2 w-40 rounded-md"
              />
            )} */}
          </div>
          {!videoModal && (
            <div className="mb-4">
              {/* Video Links */}
              <label className="block text-gray-700 dark:text-white mb-2">
                Videos
              </label>
              <button
                onClick={() => setVideoModal(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md"
              >
                + Add Video
              </button>
              <ul className="mt-2">
                {videos.map((video, index) => (
                  <li key={index} className="text-blue-500">
                    {/* <video src={video.videoUrl}></video> */}
                    {video.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Tags Input */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white mb-2">
              Tags (Press Enter to add)
            </label>
            <input
              type="text"
              onKeyDown={handleAddTag}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
            />
            <div className="flex gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 dark:bg-green bg-crimson text-white rounded-md flex"
                >
                  {tag}{" "}
                  <X
                    className="ml-1 cursor-pointer"
                    size={14}
                    onClick={() => handleRemoveTag(index)}
                  />
                </span>
              ))}
            </div>
          </div>
          {/* External Links */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white mb-2">
              External Links
            </label>
            <button
              onClick={handleAddLink}
              className="px-3 py-1 bg-purple-500 text-white rounded-md"
            >
              + Add Link
            </button>
            <ul className="mt-2">
              {links.map((link, index) => (
                <li key={index} className="text-purple-500 flex">
                  {link}{" "}
                  <X
                    className="ml-1 cursor-pointer"
                    size={14}
                    onClick={() => handleRemoveLink(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
          {/* submit form */}
          <div className="flex items-center justify-end my-6 dark:bg-gray-900/20 bg-gray-100 p-2 rounded-md">
            <button
              onClick={handleSaveBlog}
              className={`px-4 py-2  bg-crimson hover:bg-crimson/80 dark:bg-green hover:opacity-80 text-white rounded-lg hover:bg-green-600 transition-all ${videoModal && "cursor-not-allowed"}`}
            >
              Save Blog
            </button>
          </div>
        </form>
        {/* If videoModal is true */}
        {videoModal && (
          <OutsideClickHandler onOutsideClick={() => setVideoModal(false)}>
            <form
              onSubmit={handleAddVideo}
              className="absolute inset-0 top-[60%] h-fit dark:bg-gray-900 bg-slate-100 shadow shadow-black z-10 p-2 rounded-md w-[90%] max-500:w-[95%] mx-auto"
            >
              <h1
                className="mb-5 place-self-end cursor-pointer"
                onClick={() => setVideoModal(false)}
              >
                <X />
              </h1>
              <input
                type="text"
                name="title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter Video Title"
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
              />
              <input
                type="text"
                name="description"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                placeholder="Enter Video Description"
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
              />
              <input
                type="text"
                name="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter Video Url"
                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
              />
              {/* video thumbnail */}
              <div className="my-3">
                <label
                  htmlFor="videoThumbnail"
                  className="dark:text-gray-300 text-gray-800"
                >
                  Add Thumbnail
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  id="videoThumbnail"
                  accept="image/*"
                  onChange={handleVideoThumbnailUpload}
                  className="dark:text-gray-300 text-gray-800"
                />
              </div>
              {/* video links */}
              <div className="mb-4">
                <label
                  htmlFor="videoLinks"
                  className="block text-gray-700 dark:text-white mt-2"
                >
                  Add Links
                </label>
                <input
                  type="text"
                  id="videoLinks"
                  className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
                  placeholder="Press Enter to add link"
                  onKeyDown={handleVideoLinks}
                />

                <div className="flex gap-2">
                  {videoLinks.length > 0 &&
                    videoLinks.map((link, index) => (
                      <div
                        className="bg-green p-1 rounded-md relative flex"
                        key={index}
                      >
                        {link}{" "}
                        <X
                          className="ml-1 cursor-pointer"
                          size={14}
                          onClick={() => handleRemoveVideoLink(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <button
                type="submit"
                className=" px-4 py-2 grid mx-auto bg-crimson hover:bg-crimson/80 dark:bg-green hover:opacity-80 text-white rounded-lg hover:bg-green-600 transition-all"
                onClick={handleSubmitVideo}
              >
                Submit Video
              </button>
            </form>
          </OutsideClickHandler>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
