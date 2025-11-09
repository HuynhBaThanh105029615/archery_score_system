"use client";

import React from "react";
import MemberCard, {TeamMember} from "@/src/component/MemberCard";

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
    <main className="min-h-screen text-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Our Team</h1>
          <p className="text-gray-700 text-lg">
            We are a dedicated team of developers and analysts building awesome software solutions.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-3xl font-semibold mb-6 text-center">Meet the Team</h2>

          <MemberCard teamMembers={teamMembers}/>
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
