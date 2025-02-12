import Image from "next/image";

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* About Content */}
      <main className="py-12 px-6 md:px-20">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Who We Are</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our blog is dedicated to delivering insightful, engaging, and informative content across a variety of topics. From technology to travel, health to lifestyle, we strive to inspire and educate our readers every day.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <Image
              src="/team.jpeg"
              alt="Our Team"
              width={500}
              height={350}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">Our Mission</h3>
            <p className="text-gray-700">
              We aim to empower our readers with knowledge and insights that can
              make a positive impact on their lives. Our mission is to create a
              platform that fosters learning, growth, and connection.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-last md:order-first">
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">Our Vision</h3>
            <p className="text-gray-700">
              To become a trusted source of valuable content and a vibrant
              community where readers can share their ideas and experiences.
            </p>
          </div>
          <div>
            <Image
              src="/vision.jpeg"
              alt="Our Vision"
              width={500}
              height={350}
              className="rounded-xl shadow-lg"
            />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-purple-900">Meet the Team</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Behind every great blog is a team of passionate individuals. Here
            are the people who make it all happen.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="/business-1.jpg"
                alt="Team Member 1"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-medium text-orange-900">Jane Doe</h3>
              <p className="text-gray-500">Editor-in-Chief</p>
            </div>
            <div className="text-center">
              <Image
                src="/business-2.jpg"
                alt="Team Member 2"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-medium text-orange-900">John Smith</h3>
              <p className="text-gray-500">Lead Writer</p>
            </div>
            <div className="text-center">
              <Image
                src="/business-3.jpg"
                alt="Team Member 3"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-medium text-orange-900">Johnson Guzi</h3>
              <p className="text-gray-500">Creative Director</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}