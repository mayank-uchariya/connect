"use client";

import Link from "next/link";
import React from "react";
import { FaHome, FaPen, FaUsers, FaUserEdit } from "react-icons/fa";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: <FaHome className="text-2xl" /> },
    { href: "/create-post", label: "Create Post", icon: <FaPen className="text-2xl" /> },
    { href: "/edit-post", label: "People", icon: <FaUsers className="text-2xl" /> },
    { href: "/profile", label: "Edit Profile", icon: <FaUserEdit className="text-2xl" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg font-['RL_DroidKufi','Founders Grotesk Mono Regular','Arial','Helvetica','sans-serif']">
      <ul className="flex justify-around py-2">
        {links.map((link) => (
          <li key={link.href} className="flex-1">
            <Link
              href={link.href}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-gray-300 text-gray-800"
                  : "hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {link.icon}
              <span className="text-xs text-gray-700">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomBar;
