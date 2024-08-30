"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";

type Inputs = {
  postPhoto?: FileList;
  caption: string;
  tag: string;
};

const Posting = ({
  post,
  handlePublish,
}: {
  post: any;
  handlePublish: any;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: post,
  });

  const postPhoto = watch("postPhoto");

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gradient-to-br from-teal-300 to-blue-400">
      <form
        onSubmit={handleSubmit(handlePublish)}
        className="flex flex-col gap-6 p-8 w-full max-w-lg rounded-lg shadow-lg bg-white"
      >
        <label
          htmlFor="photo"
          className="flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-teal-500 transition-all"
        >
          {postPhoto && postPhoto.length > 0 ? (
            typeof postPhoto[0] === "string" ? (
              <Image
                src={postPhoto[0]}
                alt="post"
                width={250}
                height={200}
                className="object-cover rounded-lg"
              />
            ) : (
              <Image
                src={URL.createObjectURL(postPhoto[0])}
                alt="post"
                width={250}
                height={200}
                className="object-cover rounded-lg"
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
