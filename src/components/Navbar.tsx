"use client";

import { useRouter } from "next/navigation";
import { useState, FC } from "react";
import { Add, Person, Search } from "@mui/icons-material";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar: FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <nav className="sticky top-0 p-4 flex justify-between items-center bg-white shadow-md z-10">
      {/* Search Section */}
      <div className="relative gap-4 flex justify-center items-center">
        <input
          type="text"
          className="w-full bg-white py-2 px-5 rounded-lg focus:outline-none text-small-semibold border border-[#FFD700]"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="absolute top-2 right-2 text-white cursor-pointer hover:text-teal-200"
          onClick={() => search!==''?router.push(`/search/post/${search}`):router.push('/')}
        />
      </div>

      {/* Create Post Button */}
      <button
        className="bg-teal-500 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-teal-200 hover:text-gray-900 transition-colors flex items-center gap-2 max-md:hidden"
        onClick={() => router.push("/create-post")}
        aria-label="Create A Post"
      >
        <Add className="text-white" />
        <span className="max-lg:hidden text-white">Create A Post</span>
      </button>

      {/* User and Profile Section (for mobile view) */}
      <div className="flex gap-4 md:hidden">
        <UserButton afterSwitchSessionUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default Navbar;
