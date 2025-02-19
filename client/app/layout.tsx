import { Metadata } from "next";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";

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
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${poppins.variable} ${josefin.variable}` }>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
