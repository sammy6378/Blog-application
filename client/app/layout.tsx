import { Metadata } from "next";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import ProviderFunction from "@/components/context/AppContext";
import { Toaster } from "react-hot-toast";
import AuthSession from "@/components/utils/SessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--josefin",
});

export const metadata: Metadata = {
  title: "Blog Application",
  description:
    "Blogify is a dynamic and modern web application designed for publishing and managing blogs in various categories such as technology, medicine, and more. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), Blogify offers a seamless user experience for both content creators and readers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${poppins.variable} ${josefin.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        try {
          var theme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          document.documentElement.classList.add(theme);
        } catch (e) {}
      })();
      `,
          }}
        /> */}
      </head>
      <body
        className={`dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white duration-300 bg-no-repeat min-h-screen w-full dark:text-white text-black`}
      >
        <AuthSession>
          <ProviderFunction>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </ProviderFunction>
        </AuthSession>
      </body>
    </html>
  );
}
