import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Blog Application",
  description: "Blogify is a dynamic and modern web application designed for publishing and managing blogs in various categories such as technology, medicine, and more. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), Blogify offers a seamless user experience for both content creators and readers."
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}