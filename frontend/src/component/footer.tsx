"use client"

import "../app/global.css";
import { FaGithub } from "react-icons/fa";

export function Footer() {
    return(
        <footer className="bg-gray-800 px-4 md: px-16 lg:px-28 py-6">
            <div className = 'grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div>
                    <h2 className = "text-lg font-bold mb-4 text-white">About us</h2>
                    <p className = "text-gray-300">
                        We are the team that provides the best service for archers to record their scores
                    </p>
                </div>

                <div>
                    <h2 className = "text-lg font-bold mb-4 text-white">Quick Links</h2>
                    <ul>
                        <li><a href="/" className="hover:underline text-gray-300">Home</a></li>
                        <li><a href="/tournaments" className="hover:underline text-gray-300">Tournaments</a></li>
                        <li><a href="/" className="hover:underline text-gray-300">Something</a></li>
                        <li><a href="/about" className="hover:underline text-gray-300">About</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className = "text-lg font-bold mb-4 text-white">Follow us</h2>
                    <ul className="flex space-x-4">
                        <a
                        href="https://github.com/HuynhBaThanh105029615/archery_score_system"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                            <FaGithub size={32} /> {/* 👈 makes the icon bigger */}
                        </a>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-600 p-4 text-gray-300 text-center mt-6">
                <p>©2025 ArcherScoreHub</p>
            </div>
        </footer>
    )
}