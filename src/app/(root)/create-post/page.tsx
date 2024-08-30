"use client"

import React, { useEffect, useState } from "react";
import Posting from "@/components/Posting";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";

const page = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});

  const getUser = async () => {
    if (user?.id) {
      const res = await fetch(`/api/user/${user.id}`);
      const data = await res.json();
      setUserData(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      getUser();
    }
  }, [user, isLoaded]);

  const postData = {
    creator: userData?._id,
    caption: "",
    tag: "",
    postPhoto: null,
  }

  return loading || !isLoaded ? <Loader/> : (
    <div>
      <Posting post={postData} handlePublish={()=>{}} />
    </div>
  );
};

export default page;
