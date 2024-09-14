import Post from "@/lib/models/Post";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { writeFile } from "fs/promises";
import path from "path";

export const POST = async (req: Request) => {
  try {
    await connectToDB();

    const data = await req.formData();

    // Get file and validate it
    let postPhoto = data.get("postPhoto") as File;
    if (!postPhoto || postPhoto.size === 0) {
      return new Response("No photo provided", { status: 400 });
    }

    const validMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validMimeTypes.includes(postPhoto.type)) {
      return new Response("Invalid file type", { status: 400 });
    }

    // File path setup to store the file in the temporary directory
    const uniqueFileName = `${Date.now()}-${postPhoto.name}`;
    const postPhotoPath = path.join("/tmp", uniqueFileName);

    // Convert file to buffer and save it to the /tmp directory
    const bytes = await postPhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(postPhotoPath, buffer);

    const postPhotoUrl = `/uploads/${uniqueFileName}`; // This won't persist after the request ends

    // Create new post in MongoDB
    const newPost = await Post.create({
      creator: data.get("creator"),
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto: postPhotoUrl, // URL points to /tmp but it won't persist
    });

    await newPost.save();

    // Update user's posts array
    await User.findByIdAndUpdate(
      data.get("creator"),
      { $push: { posts: newPost._id } },
      { new: true }
    );

    return new Response(JSON.stringify(newPost), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
