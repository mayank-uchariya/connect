"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

type Inputs = {
  postPhoto?: FileList;
  caption: string;
  tag: string;
};

const Posting = ({ post, apiEndPoint }: { post: any; apiEndPoint: any }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: post,
  });

  const router = useRouter();
  
  const postPhoto= watch("postPhoto");
  
  const handlePublish = async (data: any) => {
    console.log(data)
    try {
      const post = new FormData();
      post.append("creator", data.creator);
      post.append("caption", data.caption);
      post.append("tag", data.tag);
      if (typeof data.postPhoto !== "string") {
        post.append("postPhoto", data.postPhoto[0]);
      } else {
        post.append("postPhoto", data.postPhoto);
      }

      const response = await fetch(apiEndPoint, {
        method: "POST",
        body: post,
      });
      if (response.ok) {
        router.push(`/profile/${data.creator}/posts`);
      }
    } catch (error: any) {
      console.log("Create Post Failed", error.message);
    }
  };

  return (
    <div className="flex justify-center h-[90vh] max-md:h-[60vh]">
      <form
        onSubmit={handleSubmit(handlePublish)}
        className="flex flex-col gap-6 max-md:gap-4 p-8 w-full max-w-xl rounded-lg shadow-lg bg-white border border-[#FFD700]"
      >
        <label
          htmlFor="photo"
          className="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-border-[#FFD700] rounded-lg p-2 hover:border-teal-500 transition-all"
        >
          {postPhoto ? (
            typeof postPhoto === "string" ? (
              <Image
                src={postPhoto}
                alt="post"
                width={250}
                height={200}
                className="object-contain rounded-lg h-[10rem] w-[20rem]"
              />
            ) : (
              <Image
                src={URL.createObjectURL(postPhoto[0])}
                alt="post"
                width={250}
                height={200}
                className="object-contain rounded-lg h-[10rem] w-[20rem]"
              />
            )
          ) : (
            <>
              <AddPhotoAlternateOutlined
                sx={{ fontSize: "80px", color: "#4a4a4a" }}
              />
              <p className="mt-2 text-lg text-gray-600">Upload an image</p>
            </>
          )}
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          {...register("postPhoto", {
            validate: (value: any) =>
              value?.length > 0 || "A photo is required!",
          })}
          className="hidden"
        />
        {errors.postPhoto && (
          <p className="text-red-500 text-sm mt-2">
            {errors.postPhoto.message}
          </p>
        )}

        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-semibold text-gray-700"
          >
            Caption
          </label>
          <textarea
            id="caption"
            placeholder="Write your content here..."
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            {...register("caption", {
              required: "Caption is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Caption must be more than 2 characters";
                }
              },
            })}
          />
          {errors.caption && (
            <p className="text-red-500 text-sm mt-1">
              {errors.caption.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-semibold text-gray-700"
          >
            Tags
          </label>
          <input
            id="tags"
            placeholder="Enter tags..."
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            {...register("tag", { required: "Tag is required" })}
          />
          {errors.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-md transition-all mt-4 w-full font-semibold text-lg"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Posting;
