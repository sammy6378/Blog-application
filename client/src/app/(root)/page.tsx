import Image from "next/image";
import Link from "next/link";
import About from "../../components/about";
import { FaPenFancy, FaGlobe, FaUsers } from "react-icons/fa";
export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-[60vh] text-white" style={{ backgroundImage: "url('https://i.pinimg.com/736x/39/d6/fa/39d6fabe8cb232c02a28ae7e6d075036.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Blog</h1>
          <p className="text-lg md:text-xl mt-4 text-center max-w-2xl">
            Discover stories, tips, and insights to fuel your creativity and knowledge.
          </p>
          <p className="mt-6">
              <Link href="/user/sign-up"  className="bg-orange-600 text-white px-6 py-3 rounded-xl mt-4">Join Today</Link> 
             </p>
        </div>
      </header>

      <About />
       {/* Why Choose Us Section */}
       <section className="py-12 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-purple-900">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-100 rounded-lg shadow-md">
            <div className="flex justify-center mb-4 text-orange-500 text-4xl">
              <FaPenFancy />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">Expert Writers</h3>
            <p className="text-gray-700">Our blogs are written by industry experts with years of experience.</p>
          </div>
          <div className="p-6 bg-slate-100 rounded-lg shadow-md">
            <div className="flex justify-center mb-4 text-orange-500 text-4xl">
              <FaGlobe />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">Diverse Topics</h3>
            <p className="text-gray-700">From technology to lifestyle, we cover a wide range of interests.</p>
          </div>
          <div className="p-6 bg-slate-100 rounded-lg shadow-md">
            <div className="flex justify-center mb-4 text-orange-500 text-4xl">
              <FaUsers />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">Community Focus</h3>
            <p className="text-gray-700">Join a community of readers passionate about learning and growth.</p>
          </div>
        </div>
      </section>
      {/* Featured Blogs */}
      <main className="py-12 px-6 md:px-20">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-purple-900">Featured Blogs</h2>
          <p className="text-gray-600">
            Handpicked blog posts for you to explore and enjoy.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">  
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Image src="/tech.jpeg" alt="Tech Blogs" width={400} height={250} className="w-full object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-orange-500">Tech Blogs</h3>
              <p className="text-gray-700">Discover the latest tech trends and updates.</p>
              <a href="#" className="text-blue-500 hover:underline font-medium mt-4 block">Read More</a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Image src="/travel1.jpeg" alt="Travel Blogs" width={400} height={250} className="w-full object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-orange-500">Travel Blogs</h3>
              <p className="text-gray-700">Explore the world through the eyes of our bloggers.</p>
              <a href="#" className="text-blue-500 hover:underline font-medium mt-4 block">Read More</a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Image src="/health.jpeg" alt="Health Blogs" width={400} height={250} className="w-full object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-orange-500">Health Blogs</h3>
              <p className="text-gray-700">Discover the best practices of a healthy lifestyle.</p>
              <a href="#" className="text-blue-500 hover:underline font-medium mt-4 block">Read More</a>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Page */}
      <section className="py-12 px-6 md:px-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-900">Contact Us</h2>
        <p className="text-gray-600">Have a question or feedback? Reach out to us!</p>

        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-8">
          <div className="md:w-1/2 flex justify-center">
            <Image src="/contact.png" alt="Contact Us" width={400} height={250} className="rounded-lg object-cover" />
          </div>

          <form className="w-full md:w-1/2 space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="input-container w-full border rounded-lg p-3"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="input-container w-full border rounded-lg p-3"
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                className="input-container w-full border rounded-lg p-3 h-32"
              ></textarea>
            </div>
            <div>
              <button type="submit" className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Blogger. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}