"use client"

import Loader from "@/components/Loader";
import Posting from "@/components/Posting";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<any>({});

  const getPost = async () => {
    const res = await fetch(`/api/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setPostData(data);
    setLoading(false);
  };

  useEffect(() => {
    getPost();
  }, [id]);

  const postInfo = {
    creator: postData?.creator?._id,
    caption: postData?.caption,
    tag: postData?.tag,
    postPhoto: postData?.postPhoto,
  }

  return loading ? <Loader/> : (
    <div>
      <Posting post={postInfo} apiEndPoint={`/api/post/${id}`}/>
    </div>
  );
};

export default page;
