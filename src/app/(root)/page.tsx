"use client";

import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import React, { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user, isLoaded , isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [feedPost, setFeedPost] = useState<any[]>([]);
  const { signOut } = useClerk();
  const router = useRouter();

  const getFeedPost = async () => {
    try {
      const res = await fetch("/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      setFeedPost(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(isSignedIn){
      getFeedPost();
    }
    else{
      if(!localStorage.getItem("Item")){
        router.push('/sign-in');
      }
    }
  }, [isSignedIn]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      <h1 className="text-2xl font-bold underline p-4">Feed</h1>
      <div className="flex flex-wrap justify-center p-6 gap-6">
        {feedPost.length > 0 ? (
          feedPost.map((post: any) => (
            <PostCard
              key={post._id}
              post={post}
              creator={post.creator}
              loggedInUser={user}
              update={getFeedPost}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
