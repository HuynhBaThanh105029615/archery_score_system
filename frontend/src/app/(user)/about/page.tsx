"use client";

import React from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Huynh Ba Thanh",
    role: "Frontend Developer",
    bio: "Specializes in React, TypeScript, and crafting intuitive user interfaces.",
    avatarUrl: "/thanh.jpg",
  },
  {
    name: "Le Anh Tuan",
    role: "Frontend Developer",
    bio: "Passionate about creating responsive and accessible web designs.",
    avatarUrl: "/tuan.jpg",
  },
  {
    name: "Huynh Doan Hoang Minh",
    role: "Backend Developer",
    bio: "Expert in Node.js, Express, and designing robust server architectures.",
    avatarUrl: "/minh.jpg",
  },
  {
    name: "Nguyen Ngoc Huy Hoang",
    role: "Backend Developer",
    bio: "Loves building scalable APIs and optimizing database performance.",
    avatarUrl: "/hoang.jpg",
  },
  {
    name: "Trinh Khoi Nguyen",
    role: "Data Analyst",
    bio: "Passionate about turning raw data into actionable insights.",
    avatarUrl: "/nguyen.jpg",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Our Team</h1>
          <p className="text-gray-700 text-lg">
            We are a dedicated team of developers and analysts building awesome software solutions.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-3xl font-semibold mb-6 text-center">Meet the Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
              >
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mt-10">
          <p className="text-gray-600">
            Together, we combine frontend, backend, and data expertise to deliver high-quality solutions.
          </p>
        </section>
      </div>
    </main>
  );
}
