"use client";

import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const searchPost = () => {
  const { query } = useParams();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [searchPost, setSearchPost] = useState<any>({});
  const pathname = usePathname();

  const getSearchPost = async () => {
    const res = await fetch(`/api/post/search/${query}`);
    const data = await res.json();
    setSearchPost(data);
    setLoading(false);
  };

  useEffect(() => {
    getSearchPost();
  }, [query]);

  const links = [
    { href: `/search/post/${query}`, label: "Posts" },
    {
      href: `/search/people/${query}`,
      label: "People",
    },
  ];

  console.log(pathname)

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10 bg-white p-4 justify-center items-center">
      <div className="flex gap-6">
        {links.map((item:any, index:any) => (
          <Link
          className={`tab text-xl font-semibold transition-colors ${
                pathname === item.href
                  ? " text-red-400 underline"
                  : "hover:text-teal-400"
              }`}
            href={item.href}
            key={index}
            >
            {item.label}
          </Link>
        ))}
      </div>
      {links.length!==0 || <p>No Posts Found</p>}
      {searchPost.map((post: any) => (
        <PostCard
          key={post._id}
          post={post}
          creator={post.creator}
          loggedInUser={user} 
          update={undefined}        
          />
      ))}
    </div>
  );
};

export default searchPost;
