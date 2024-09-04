"use client";

import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import UserCard from "@/components/UserCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const searchPeople = () => {
  const { query } = useParams();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [searchPeople, setSearchPeople] = useState<any>({});
  const pathname = usePathname();

  const getSearchPeople = async () => {
    const res = await fetch(`/api/user/search/${query}`);
    const data = await res.json();
    setSearchPeople(data);
    setLoading(false);
  };

  useEffect(() => {
    getSearchPeople();
  }, [query]);

  const links = [
    { href: `/search/post/${query}`, label: "Posts" },
    {
      href: `/search/people/${query}`,
      label: "People",
    },
  ];

  console.log(pathname);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10 bg-white p-4 ">
      <div className="flex gap-6 justify-center items-center">
        {links.map((item: any, index: any) => (
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
      {links.length !== 0 || <p>No People Found</p>}
      {searchPeople.map((people: any) => (
        <UserCard key={people._id} userData={people} update={undefined} />
      ))}
    </div>
  );
};

export default searchPeople;
