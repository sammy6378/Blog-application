"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Sun, Moon, Menu, X } from "lucide-react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { usePathname, useRouter } from "next/navigation";
import { useContextFunc } from "./context/AppContext";
import { useSession } from "next-auth/react";
const profile = "/profile.webp";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [bar, setBar] = useState(false);
  const [active, setActive] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpenSmall, setProfileOpenSmall] = useState(false);
  const [profileOpenLarge, setProfileOpenLarge] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, handleLogout, userInfo } = useContextFunc();

  useEffect(() => setMounted(true), []);
  const { data } = useSession();

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
          setActive(true);
        } else {
          setActive(false);
        }
      });
    }
  }, []);

  if (!mounted) return null;

  const categories = [
    {
      id: 1,
      category: "Trending",
      link: "/trending",
    },
    {
      id: 2,
      category: "Tech",
      link: "/tech",
    },
    {
      id: 3,
      category: "Entertainment",
      link: "/entertainment",
    },
    {
      id: 4,
      category: "Education",
      link: "/education",
    },
    {
      id: 5,
      category: "Politics",
      link: "/politics",
    },
  ];

  return (
    <nav
      className={`w-full dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white transition duration-500 mb-1 border-b h-[80px] font-poppins sticky top-0 bg-opacity-[95%] z-[9999] ${active ? "dark:shadow-white/20 shadow-black/50 shadow-md -translate-y-4 duration-100" : "dark:shadow-white/20 shadow-black/50 shadow translate-y-0 duration-200"} ${(pathname === "/user/login" || pathname === "/user/register" || pathname === "/user/activate-user") && "hidden"}`}
    >
      <section className="flex justify-between items-center h-full w-[95%] mx-auto">
        <Link href={"/"}>
          <Image
            src={"/favicon.svg"}
            width={100}
            height={100}
            priority
            alt="logo"
            className="dark:bg-white rounded-full w-[50px] h-[50px] max-700:w-[40px] max-700:h-[40px] max-500:w-[35px] max-500:h-[35px] max-200px:max-w-[20px] max-200px:max-h-[20px]"
          />
        </Link>
        <div className="flex justify-between gap-[50px] max-800:gap-[30px] max-700:gap-[25px] ">
          <OutsideClickHandler onOutsideClick={() => setBar(false)}>
            <ul
              className={`flex items-center gap-5 font-[500] max-800:gap-3 max-700:block max-700:fixed max-700:top-[20px] max-700:dark:bg-white max-700:bg-gray-900 max-700:text-white max-700:dark:text-black max-700:p-2 max-700:w-[180px] max-700:max-w-full max-700:rounded max-700:right-2 max-300px:right-0 max-700:pt-4 max-700:h-[200px] max-200px:text-sm z-50 max-700:shadow max-700:shadow-gray-900 max-700:z-[100] ${bar ? "max-700:block" : "max-700:hidden"}`}
            >
              <li className="max-700:mt-2 max-700:mb-2">
                <Link
                  href={"/"}
                  className={`hover:text-crimson dark:hover:text-green transition max-700:text-white max-700:dark:text-black ${pathname === "/" && "text-crimson dark:text-green"}`}
                  onClick={() => setBar(false)}
                >
                  Home
                </Link>
              </li>
              <li className="relative">
                <div
                  className="flex items-center hover:text-crimson dark:hover:text-green transition cursor-pointer text-black dark:text-white max-700:dark:text-black max-700:text-white max-700:my-5"
                  onClick={() => setCategoryOpen(!categoryOpen)}
                >
                  {" "}
                  <span>Category</span>
                  {categoryOpen ? (
                    <ChevronUp className="" size={15} />
                  ) : (
                    <ChevronDown className="" size={15} />
                  )}
                </div>
                <OutsideClickHandler
                  onOutsideClick={() => setCategoryOpen(false)}
                >
                  {categoryOpen && (
                    <section className="absolute z-[9999] top[30px] flex flex-col dark:bg-white bg-gray-900 shadow shadow-gray-900 rounded p-2 ">
                      {categories.map((category, index) => (
                        <Link
                          href={category.link}
                          key={index}
                          className="hover:text-white dark:hover:text-black transition text-crimson dark:text-green px-2 py-1.5"
                        >
                          {category.category}
                        </Link>
                      ))}
                    </section>
                  )}
                </OutsideClickHandler>
              </li>
              <li className="max-700:mb-5">
                <Link
                  href={"/contact"}
                  className={`hover:text-crimson dark:hover:text-green transition ${pathname === "/contact" && "text-crimson dark:text-green"}`}
                  onClick={() => setBar(false)}
                >
                  Contact Us
                </Link>
              </li>
              {accessToken ? (
                /*  */
                <div className="relative 700:hidden">
                  <div
                    onClick={() => setProfileOpenSmall(!profileOpenSmall)}
                    className="flex items-end"
                  >
                    <Image
                      src={
                        userInfo?.avatar?.url || data?.user?.image || profile
                      }
                      alt="avatar"
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] rounded-full object-cover"
                      unoptimized
                    />
                    {profileOpenSmall ? (
                      <ChevronUp
                        className="cursor-pointer text-gray-500"
                        size={15}
                      />
                    ) : (
                      <ChevronDown
                        className="cursor-pointer text-gray-500"
                        size={15}
                      />
                    )}
                  </div>
                  <OutsideClickHandler
                    onOutsideClick={() => setProfileOpenSmall(false)}
                  >
                    {profileOpenSmall && (
                      <div className="z-50 absolute bg-gray-900 dark:bg-white p-2 rounded shadow space-y-3">
                        <Link
                          href={"/profile"}
                          className="hover:text-white dark:hover:text-black transition text-crimson dark:text-green px-2 py-1.5"
                          onClick={() => setBar(false)}
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="mx-2 hover:opacity-90 bg-crimson px-2 py-1 rounded duration-500 700:hidden "
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </OutsideClickHandler>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/user/login")}
                  className="dark:bg-green hover:opacity-90 bg-crimson px-2 py-1 rounded duration-500 700:hidden "
                >
                  Login
                </button>
              )}
            </ul>
          </OutsideClickHandler>
          <div className="flex gap-4 items-center">
            {/* switch modes */}
            {theme === "light" ? (
              <Moon
                onClick={() => setTheme("dark")}
                className="cursor-pointer text-black dark:text-white hover:text-slate-800 max-200px:w-[15px] max-200px:h-[15px] "
                fill="black"
              />
            ) : (
              <Sun
                onClick={() => setTheme("light")}
                className="cursor-pointer hover:text-slate-300 dark:text-white text-black max-200px:w-[15px] max-200px:h-[15px]"
                fill="black"
              />
            )}

            {bar ? (
              <X
                className="cursor-pointer z-[100] dark:text-black text-white max-200px:w-[15px] max-200px:h-[15px] 700:hidden"
                size={24}
                onClick={() => setBar(!bar)}
              />
            ) : (
              <span
                className="cursor-pointer z-[100] dark:text-white text-black 700:hidden"
                onClick={() => setBar(!bar)}
              >
                <HiOutlineMenuAlt3 size={24} />
              </span>
            )}

            {accessToken ? (
              <div className="max-700:hidden relative">
                <div
                  className="flex items-end"
                  onClick={() => setProfileOpenLarge(!profileOpenLarge)}
                >
                  <Image
                    src={userInfo?.avatar?.url || data?.user?.image || profile}
                    alt="avatar"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full object-cover"
                    unoptimized
                  />
                  {profileOpenLarge ? (
                    <ChevronUp
                      className="cursor-pointer text-gray-500"
                      size={15}
                    />
                  ) : (
                    <ChevronDown
                      className="cursor-pointer text-gray-500"
                      size={15}
                    />
                  )}
                </div>

                {profileOpenLarge && (
                  <OutsideClickHandler
                    onOutsideClick={() => setProfileOpenLarge(false)}
                  >
                    <div className="z-20 absolute bg-gray-900 dark:bg-white p-2 rounded shadow space-y-3 w-[120px] right-0 mt-2">
                      <Link
                        href={"/profile"}
                        className="hover:text-white dark:hover:text-black transition text-crimson dark:text-green px-2 py-1.5 whitespace-nowrap"
                        onClick={() => setProfileOpenLarge(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="hover:opacity-90 bg-crimson px-2 py-1 rounded duration-500 max-700:hidden "
                      >
                        Logout
                      </button>
                    </div>
                  </OutsideClickHandler>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/user/login")}
                className="dark:bg-green hover:opacity-90 bg-crimson px-4 py-1 rounded duration-500 max-700:hidden"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </section>
    </nav>
  );
}
