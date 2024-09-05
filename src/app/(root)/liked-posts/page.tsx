"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import React, { useEffect } from "react";
import { useState } from "react";

const LikedPosts = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState<any>({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user?.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user,getUser]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="bg-white">
      <h1 className="text-2xl font-bold underline p-4">Liked Posts</h1>
      <div className="flex flex-col gap-9 items-center p-4">
        {userData?.likedPosts?.map((post: any) => (
          <PostCard
            key={post._id}
            post={post}
            creator={post.creator}
            loggedInUser={user}
            update={getUser}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedPosts;
