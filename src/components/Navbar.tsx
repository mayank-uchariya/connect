"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FC } from "react";
import { Add, Person, Search } from "@mui/icons-material";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar: FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState('')

  return (
    <nav className="sticky top-0 p-4 flex justify-between items-center bg-teal-500 shadow-md z-10">
      {/* Search Section */}
      <div className="flex items-center space-x-2 relative">
        <input
          type="text"
          placeholder="Search people,posts,..."
          className="p-2 rounded-lg border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
          aria-label="Search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <Search className="text-white" />
      </div>

      {/* Create Post Button */}
      <button
        className="bg-white text-teal-500 py-2 px-4 rounded-lg shadow hover:bg-teal-600 hover:text-white transition-colors flex items-center gap-2 max-md:hidden"
        onClick={() => router.push("/create-post")}
        aria-label="Create A Post"
      >
        <Add className="text-teal-500" />
        <span className="max-lg:hidden">Create A Post</span>
      </button>

      <div className="flex gap-4 md:hidden">
        <Link href={`/`}>
          <Person sx={{ fontSize: "35px", color: "white" }} />
        </Link>
        <UserButton afterSwitchSessionUrl="/sign-in" />
      </div>
      
    </nav>
  );
};

export default Navbar;
