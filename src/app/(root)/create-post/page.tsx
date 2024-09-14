"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import Posting from "@/components/Posting";
import { useEffect, useState } from "react";

const CreatePost = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${user?.id}`);
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getUser();
    }
  }, [user]);

  const postData = {
    creator: userData?._id,
    caption: "",
    tag: "",
    postPhoto: null,
  };

  if (loading || !isLoaded) return <Loader />;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="pt-6">
      <Posting post={postData} apiEndPoint={"/api/post/new"} />
    </div>
  );
};

export default CreatePost;
