"use client";

import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  const getUser = async () => {
    const res = await fetch(`/api/user/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  console.log(userData)

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9 p-4">
      <ProfileCard userData={userData} activeTab="Posts" />

      <div className="flex flex-col gap-9">
        {userData?.posts?.map((post: any) => (
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

export default Posts;
