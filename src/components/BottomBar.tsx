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
    { href: "/people", label: "People", icon: <FaUsers className="text-2xl" /> },
    { href: "/profile", label: "Edit Profile", icon: <FaUserEdit className="text-2xl" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-teal-500 border-t border-white shadow-lg">
      <ul className="flex justify-around py-2">
        {links.map((link) => (
          <li key={link.href} className="flex-1">
            <Link
              href={link.href}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                pathname === link.href
                  ? "bg-white text-teal-500"
                  : "hover:bg-white hover:text-teal-500"
              }`}
            >
              {link.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomBar;
