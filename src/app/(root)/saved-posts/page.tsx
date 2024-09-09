"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import React, { useEffect } from "react";
import { useState } from "react";

const SavedPosts = () => {
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
  }, [user]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="bg-gray-50">
      <h1 className="text-2xl font-bold underline p-4">Saved-Post</h1>
      <div className="flex flex-col gap-9 items-center p-4">
        {userData?.savedPosts?.length===0 && <p className="font-semibold text-lg">No Saved posts yet!</p>}
        {userData?.savedPosts?.map((post: any) => (
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

export default SavedPosts;
