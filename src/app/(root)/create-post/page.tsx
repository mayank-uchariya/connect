"use client";

import { useEffect, useState } from "react";
import Posting from "@/components/Posting";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";

// Define a type for the user data
type UserData = {
  _id?: string;
};

const CreatePost = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({});

  const getUser = async () => {
    if (user?.id) {
      try {
        const res = await fetch(`/api/user/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
      getUser();
  }, [user]);

  const postData = {
    creator: userData?._id || "",
    caption: "",
    tag: "",
    postPhoto: null,
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-50">
      <h1 className="text-2xl font-bold underline p-4">Create Post</h1>
      <Posting post={postData} apiEndPoint={`api/post/new`} />
    </div>
  );
};

export default CreatePost;
