"use client";

import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const Home = () => {
  const { user,isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [feedPost, setFeedPost] = useState<any>({});

  const getFeedPost = async () => {
    const res = await fetch("/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setFeedPost(data);
    setLoading(false);
  };

  useEffect(() => {
    getFeedPost();
  }, []);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="min-h-screen w-full bg-white text-gray-800">
      <div className="flex flex-wrap justify-center p-6">
        {feedPost.length > 0 ? (
          feedPost.map((post:any) => (
            <PostCard key={post._id} post={post} creator={post.creator} loggedInUser={user} />
          ))
        ) : (
          <p className="text-center text-gray-600">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
