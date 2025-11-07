"use client";

import "../app/global.css";

type ArcherItem = {
  text: string;
  link?: string;
};

type ArcherCardProps = {
  title: string;
  items: ArcherItem[];
};

export function ArcherCard({ title, items }: ArcherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-green-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">
        {title}
      </h3>
      <ul className="space-y-1 text-gray-700 list-disc list-inside">
        {items.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <a href={item.link} className="text-blue-600 underline">
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
