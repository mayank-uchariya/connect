import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  BookmarkBorder,
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

const PostCard = ({
  post,
  creator,
  loggedInUser,
  update
}: {
  post: any;
  creator: any;
  loggedInUser: any;
  update:any
}) => {

  const [userData, setUserData] = useState<any>({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${loggedInUser?.id}`);
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const isSaved = userData?.savedPosts?.find((item:any) => item._id === post._id);
  const isLiked = userData?.likedPosts?.find((item:any) => item._id === post._id);

  const handleSave = async () => {
    const response = await fetch(
      `/api/user/${loggedInUser?.id}/save/${post?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data);
    update();
  };

  const handleLike = async () => {
    const response = await fetch(
      `/api/user/${loggedInUser?.id}/like/${post?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data);
    update();
  };

  const handleDelete = async () => {
    await fetch(`/api/post/${post?._id}/${userData?._id}`, {
      method: "DELETE",
    });
    update();
  };
  
  return (
    <div className="w-full max-w-2xl rounded-lg flex flex-col gap-4 bg-white p-5 max-sm:gap-2 border border-[#FFD700]">
      <div className="flex justify-between">
        <Link href={`/profile/${creator._id}/posts`}>
          <div className="flex gap-3 items-center">
            <Image
              src={creator?.profilePhoto}
              alt="profile photo"
              width={50}
              height={50}
              className="rounded-full h-[3.5rem] w-[3.5rem] object-cover max-md:h-[2.5rem] max-md:w-[2.5rem]"
            />
            <div className="flex flex-col gap-1">
              <p className="text-small-semibold">
                {creator?.firstName} {creator?.lastName}
              </p>
              <p className="text-subtle-medium">
                @{creator?.username}
              </p>
            </div>
          </div>
        </Link>

        {loggedInUser?.id === creator.clerkId && (
          <Link href={`/edit-post/${post._id}`}>
            <BorderColor sx={{ color: "black", cursor: "pointer" }} />
          </Link>
        )}
      </div>

      <p className="text-body-normal max-sm:text-small-normal">
        {post?.caption}
      </p>

      <Image
        src={post?.postPhoto}
        alt="post photo"
        width={200}
        height={150}
        className="rounded-lg w-full h-[25rem] max-md:h-[15rem]"
      />

      <p className="text-base-semibold max-sm:text-small-normal">
        {post?.tag}
      </p>

      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {!isLiked ? (
            <FavoriteBorder
              sx={{ color: "black", cursor: "pointer" }}
              onClick={() => handleLike()}
            />
          ) : (
            <Favorite
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => handleLike()}
            />
          )}
          <p className="">{post.likes.length}</p>
        </div>

        {loggedInUser?.id !== creator?.clerkId &&
          (isSaved ? (
            <Bookmark
              sx={{ color: "purple", cursor: "pointer" }}
              onClick={() => handleSave()}
            />
          ) : (
            <BookmarkBorder
              sx={{ color: "black", cursor: "pointer" }}
              onClick={() => handleSave()}
            />
          ))}

        {loggedInUser?.id === creator?.clerkId && (
          <Delete
            sx={{ color: "black", cursor: "pointer" }}
            onClick={() => handleDelete()}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
