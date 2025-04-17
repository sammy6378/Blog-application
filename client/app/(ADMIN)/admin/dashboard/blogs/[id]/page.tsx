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
  Camera,
  X,
  CameraIcon,
} from "lucide-react";
import { IBlog, IVideo, useContextFunc } from "@/components/context/AppContext";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Image from "next/image";
import {
  deleteBlog,
  ICreateVideo,
  IUpdateBlog,
  updateBlog,
} from "@/components/services/blogService";
import { toast } from "react-hot-toast";
import OutsideClickHandler from "react-outside-click-handler";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export default function BlogDetails() {
  const { blogs, getBlogsFunc } = useContextFunc();
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
  const [description, setDescription] = useState(blog?.description || "");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<{ url: string } | string>({
    url: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [addTag, setAddTag] = useState(false);
  const [addVideoLink, setAddVideoLink] = useState(false);
  const [links, setLinks] = useState<string[]>([]);
  const [addLink, setAddLink] = useState(false);
  //markdown
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  //videos
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
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
        setTags(foundBlog.tags);
        setThumbnail(foundBlog.thumbnail);

        //videos
        setVideos(foundBlog.videos);
      }
      console.log("found blog: ", foundBlog);
    }
  }, [id, blogs]);

  //delete entire blog
  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog? This is permanent and cannot be undone :(")) {
      try {
        const response = await deleteBlog(id);
        if (response.success) {
          toast.success(response.message);
          await getBlogsFunc();
          router.push('/admin/dashboard/blogs');
        } else {
          toast.error(response.message);
        }
      } catch (error: any) {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

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

  const handleEditTag = (e: any, index: number) => {
    const updatedTags = [...tags];
    updatedTags[index] = e.target.value;
    setTags(updatedTags);
  };

  const addNewTag = (e: any) => {
    if (e.key === "Enter") {
      setTags([...tags, e.target.value]);
      setAddTag(false);
    }
    e.target.value === "";
  };

  /*   const addNewVideoTag = (e: any) => {
    if(e.key === "Enter") {
      const updated
    }
  } */

  const handleThumbnailUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState == 2) {
        const fileName = fileReader.result as string;
        setThumbnail(fileName);
      }
    };
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  /*  const handleVideoThumbnailUpdate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const fileName = fileReader.result as string;
        setVideoThumbnail(fileName);
      }
    };
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
  }; */

  const handleVideoThumbnailUpload = (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const video_thumbnail = fileReader.result as string;
        setVideoThumbnail(video_thumbnail);
      }
    };
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleVideoLinks = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newLink = (e.target as HTMLInputElement).value.trim();
      if (!videoLinks.includes(newLink)) {
        setVideoLinks([...videoLinks, newLink]);
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  const handleRemoveVideoLink = (index: number) => {
    const newLinks = videoLinks.filter((_, i) => index !== i);
    setVideoLinks(newLinks);
  };

  const handleSubmitVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newVideo = {
      title: videoTitle,
      description: videoDescription,
      videoUrl,
      videoThumbnail,
      links,
    };
    setVideos((prevVideos) => [...prevVideos, newVideo]);

    setVideoTitle("");
    setVideoDescription("");
    setVideoUrl("");
    setVideoThumbnail("");
    setVideoLinks([]);

    setVideoModal(false);
  };

  const handleUpdateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const updatedBlog: IUpdateBlog = {
      title,
      description,
      body,
      category,
      tags,
      links,
      videos: videos.map((video) => ({
        ...video,
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        videoThumbnail:
          typeof video.videoThumbnail === "object"
            ? video.videoThumbnail.url // Use existing URL
            : video.videoThumbnail, // Or new Base64 string
        links: video.links,
      })),
    };

    // Only include thumbnail if it's a new Base64 string
    if (typeof thumbnail === "string") {
      updatedBlog.thumbnail = thumbnail;
    }

    try {
      const response = await updateBlog(updatedBlog, id as string);
      if (response.success) {
        toast.success(response.message);
        router.push("/admin/dashboard/blogs");
        getBlogsFunc().then(() => setLoading(false));
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
          onClick={() => handleDeleteBlog(id as string)}
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
        <form className="mt-8" onSubmit={handleUpdateBlog}>
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

          {/* thumbnail */}
          <div className="flex flex-col gap-1 my-4">
            <p>Update Thumbnail: </p>
            <div className="relative w-fit">
              {!thumbnail ? (
                <div className="mb-7">No thumbnail</div>
              ) : (
                <Image
                  src={
                    typeof thumbnail === "string" ? thumbnail : thumbnail?.url
                  }
                  alt="thumbnail"
                  width={150}
                  height={150}
                  className="rounded shadow shadow-slate-700"
                />
              )}

              <label htmlFor="thumbnail">
                <Camera
                  className="absolute bottom-2 right-3 cursor-pointer hover:w-[24px] hover:h-[24px] transition-all"
                  width={20}
                  height={20}
                />
              </label>
            </div>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              accept="image/*"
              onChange={handleThumbnailUpdate}
              hidden
            />
          </div>

          {/* links */}
          <section className="border dark:border-slate-800 p-2 rounded shadow dark:shadow-slate-500">
            <div>
              <label htmlFor="links">Links: </label>
              {links && links.length > 0 ? (
                <div>
                  <div className="flex gap-2 flex-wrap">
                    {links.map((tag, index) => (
                      <input
                        type="text"
                        key={index}
                        defaultValue={tag}
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
                <p className="text-xs">Press (Enter) to add</p>
                <input
                  type="text"
                  className="p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md w-fit"
                  onKeyDown={addNewLink}
                  autoFocus
                />
              </div>
            )}
          </section>

          {/* tags */}
          <section className="border dark:border-slate-800 p-2 rounded shadow dark:shadow-slate-500 mt-7">
            <div>
              <label htmlFor="links">Tags: </label>
              {tags && tags.length > 0 ? (
                <div>
                  <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                      <input
                        type="text"
                        key={index}
                        defaultValue={tag}
                        onKeyDown={(e) => handleEditTag(e, index)}
                        className=" p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md w-fit"
                      />
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-1"
                    onClick={() => setAddTag(true)}
                  >
                    <PlusCircle className="hover:dark:text-green hover:text-crimson cursor-pointer transition-all" />{" "}
                    <span className="text-xs">Add Tag</span>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center gap-1"
                  onClick={() => setAddTag(true)}
                >
                  <PlusCircle className="hover:dark:text-green hover:text-crimson cursor-pointer transition-all" />
                  <span className="text-xs">Add Tag</span>
                </div>
              )}
            </div>

            {/* Add Tag */}
            {addTag && (
              <div>
                <p className="text-xs">Press (Enter) to add</p>
                <input
                  type="text"
                  className="p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md w-fit"
                  onKeyDown={addNewTag}
                  autoFocus
                />
              </div>
            )}
          </section>

          {/* videos */}
          <section className="border dark:border-slate-800 p-2 rounded shadow dark:shadow-slate-500 mt-7">
            <h1 className="text-xl mb-3 font-semibold">Blog Videos</h1>

            <div>
              {!videoModal && (
                <div className="mb-4">
                  {/* Video Links */}
                  {videos.length > 0 && (
                    <button
                      onClick={() => setVideoModal(true)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    >
                      + Add Video
                    </button>
                  )}

                  <p>{videoTitle}</p>
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
            </div>
            {videos && videos.length > 0 ? (
              <div>
                {videos.map((video, index) => (
                  <section
                    key={index}
                    className="border-b-2 mt-2 last:border-none "
                  >
                    <h2 className="font-medium mb-2 text-center">
                      Video{" "}
                      <span className="font-bold dark:text-green text-crimson">
                        {index + 1}
                      </span>
                    </h2>
                    <section>
                      <div className="mb-2">
                        <label htmlFor={`title-${index}`}>Title: </label>
                        <input
                          type="text"
                          value={video.title}
                          placeholder="video title"
                          id={`title-${index}`}
                          onChange={(e) => {
                            const updatedVideos = [...videos];
                            updatedVideos[index] = {
                              ...video,
                              title: e.target.value,
                            };
                            setVideos(updatedVideos);
                          }}
                          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor={`description-${index}`}>
                          Description:{" "}
                        </label>
                        <textarea
                          name="description"
                          id={`description-${index}`}
                          placeholder="video description"
                          value={video.description}
                          onChange={(e) => {
                            const updatedVideos = [...videos];
                            updatedVideos[index] = {
                              ...video,
                              description: e.target.value,
                            };
                            setVideos(updatedVideos);
                          }}
                          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
                        ></textarea>
                      </div>
                      <div className="mb-2">
                        <label htmlFor={`url-${index}`}>Video Url: </label>
                        <input
                          type="text"
                          id={`url-${index}`}
                          name="videoUrl"
                          placeholder="videoUrl"
                          value={video.videoUrl}
                          onChange={(e) => {
                            const updatedVideos = [...videos];
                            updatedVideos[index] = {
                              ...video,
                              videoUrl: e.target.value,
                            };
                            setVideos(updatedVideos);
                          }}
                          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
                        />
                      </div>

                      {/* links */}
                      <div className="mb-2">
                        <h2 className="after:">Video Links: </h2>
                        {video.links && video.links.length > 0 ? (
                          <>
                            <div className="flex flex-wrap gap-2">
                              {video.links.map((link, linkIndex) => (
                                <div key={linkIndex} className="flex">
                                  <input
                                    type="text"
                                    placeholder={`link-${linkIndex + 1}`}
                                    value={link}
                                    onChange={(e) => {
                                      const updatedVideos = [...videos];
                                      const singleVideo = {
                                        ...updatedVideos[index],
                                      };
                                      if (Array.isArray(singleVideo.links)) {
                                        singleVideo.links[linkIndex] =
                                          e.target.value;
                                        updatedVideos[index] = singleVideo;
                                        setVideos(updatedVideos);
                                      }
                                    }}
                                    className="w-fit p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
                                  />
                                  <X
                                    className="-ml-4 cursor-pointer"
                                    size={16}
                                    onClick={() => {
                                      const updatedVideos = [...videos];
                                      const singleVideo = {
                                        ...updatedVideos[index],
                                      };
                                      const updatedLinks =
                                        singleVideo.links.filter(
                                          (_, i) => i !== linkIndex
                                        );
                                      updatedVideos[index] = {
                                        ...singleVideo,
                                        links: updatedLinks,
                                      };
                                      setVideos(updatedVideos);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                            <section>
                              <div
                                className="flex items-center gap-1"
                                onClick={() => setAddVideoLink(true)}
                              >
                                <PlusCircle className="hover:dark:text-green hover:text-crimson cursor-pointer transition-all" />
                                <span className="text-xs">Add Link</span>
                              </div>
                              {addVideoLink && (
                                <div className="block">
                                  <p className="text-xs">
                                    Press (Enter) to add
                                  </p>
                                  <input
                                    type="text"
                                    className="p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md w-fit"
                                    onKeyDown={(e: any) => {
                                      if (e.key === "Enter") {
                                        const updatedVideos = [...videos];
                                        const updatedVideo = {
                                          ...updatedVideos[index],
                                        };
                                        const newLink = e.target.value;

                                        if (
                                          !updatedVideo.links.includes(newLink)
                                        ) {
                                          const updatedLinks = [
                                            ...updatedVideo.links,
                                            newLink,
                                          ];
                                          updatedVideos[index] = {
                                            ...updatedVideo,
                                            links: updatedLinks,
                                          };
                                          setVideos(updatedVideos);
                                          e.target.value = "";
                                        } else {
                                          alert("Link already exists");
                                        }
                                      }
                                    }}
                                    autoFocus
                                  />
                                </div>
                              )}
                            </section>
                          </>
                        ) : (
                          <div>
                            <section>
                              <div
                                className="flex items-center gap-1"
                                onClick={() => setAddVideoLink(true)}
                              >
                                <PlusCircle className="hover:dark:text-green hover:text-crimson cursor-pointer transition-all" />
                                <span className="text-xs">Add Link</span>
                              </div>
                              {addVideoLink && (
                                <div className="block">
                                  <p className="text-xs">
                                    Press (Enter) to add
                                  </p>
                                  <input
                                    type="text"
                                    className="p-2 mb-4 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md w-fit"
                                    onKeyDown={(e: any) => {
                                      if (e.key === "Enter") {
                                        const updatedVideos = [...videos];
                                        const updatedVideo = {
                                          ...updatedVideos[index],
                                        };
                                        const newLink = e.target.value;

                                        if (
                                          !updatedVideo.links.includes(newLink)
                                        ) {
                                          const updatedLinks = [
                                            ...updatedVideo.links,
                                            newLink,
                                          ];
                                          updatedVideos[index] = {
                                            ...updatedVideo,
                                            links: updatedLinks,
                                          };
                                          setVideos(updatedVideos);
                                          e.target.value = "";
                                        } else {
                                          alert("Link already exists");
                                        }
                                      }
                                    }}
                                    autoFocus
                                  />
                                </div>
                              )}
                            </section>
                          </div>
                        )}
                      </div>

                      {/* video thumbnail */}
                      <div className={`my-2 mt-4 `}>
                        <p>Update Video Thumbnail: </p>
                        <div className="relative w-fit">
                          {video.videoThumbnail && (
                            <Image
                              src={
                                typeof video.videoThumbnail === "object"
                                  ? video.videoThumbnail.url
                                  : video.videoThumbnail || ""
                              }
                              alt="video-thumbnail"
                              width={100}
                              height={100}
                              unoptimized
                              className="rounded shadow shadow-slate-700"
                            />
                          )}

                          <label htmlFor={`videothumbnail-${index}`}>
                            <Camera
                              className={`absolute bottom-2 right-3 cursor-pointer hover:w-[24px] hover:h-[24px] transition-all ${!video.videoThumbnail && "right-0"}`}
                              width={20}
                              height={20}
                            />
                          </label>
                          <input
                            type="file"
                            id={`videothumbnail-${index}`}
                            accept="image/*"
                            name="videoThumbnail"
                            hidden
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                if (fileReader.readyState === 2) {
                                  const base64String =
                                    fileReader.result as string;
                                  const updatedVideos = [...videos];
                                  updatedVideos[index] = {
                                    ...updatedVideos[index],
                                    videoThumbnail: base64String,
                                  };
                                  setVideos(updatedVideos);
                                }
                              };
                              if (e.target.files && e.target.files[0]) {
                                fileReader.readAsDataURL(e.target.files[0]); // Read the file as a Base64 string
                              }
                            }}
                          />
                        </div>
                      </div>
                    </section>
                  </section>
                ))}
              </div>
            ) : (
              <div>
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
                    <p>{videoTitle}</p>
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
              </div>
            )}
          </section>
          {/* submit button */}
          <button
            type="submit"
            className="flex items-center place-self-end mt-5 gap-1 border-[1.5px] p-2 rounded shadow-inner shadow-green bg-opacity-50 border-green hover:bg-emerald-200/50 transition-all group"
          >
            {!loading ? (
              <>
                {" "}
                <span> Update Blog </span>
                <Edit2Icon
                  size={14}
                  fill="transparent"
                  className="text-green group-hover:text-white"
                />
              </>
            ) : (
              "Updating in progress..."
            )}
          </button>
        </form>
        {/* If videoModal is true */}
        {videoModal && (
          <OutsideClickHandler onOutsideClick={() => setVideoModal(false)}>
            <form
              /*  onSubmit={handleAddVideo} */
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
                className={`px-4 py-2 grid mx-auto bg-crimson hover:bg-crimson/80 dark:bg-green hover:opacity-80 text-white rounded-lg hover:bg-green-600 transition-all ${loading && "cursor-not-allowed"}`}
                onClick={handleSubmitVideo}
              >
                Submit Video
              </button>
            </form>
          </OutsideClickHandler>
        )}
      </div>
    </section>
  );
}
