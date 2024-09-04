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
      <div className="relative gap-2">
        <input
          type="text"
          className="w-full bg-gray-600 py-3 px-5 rounded-lg focus:outline-none text-white text-small-semibold"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="absolute top-3 right-2 text-white cursor-pointer hover:text-pink-200"
          onClick={() => search!==''?router.push(`/search/post/${search}`):router.push('/')}
        />
      </div>

      {/* Create Post Button */}
      <button
        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 max-md:hidden"
        onClick={() => router.push("/create-post")}
        aria-label="Create A Post"
      >
        <Add className="text-gray-800" />
        <span className="max-lg:hidden">Create A Post</span>
      </button>

      {/* User and Profile Section (for mobile view) */}
      <div className="flex gap-4 md:hidden">
        <Link href={`/`}>
          <Person sx={{ fontSize: "35px", color: "gray" }} />
        </Link>
        <UserButton afterSwitchSessionUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default Navbar;
