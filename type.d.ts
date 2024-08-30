import mongoose from "mongoose";

type UserType = {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePhoto: string;
    posts: mongoose.Types.ObjectId[];
    savedPosts: mongoose.Types.ObjectId[];
    likedPosts: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    createdAt: Date;
}

type PostType = {
    creator: mongoose.Types.ObjectId;
    caption: string;
    postPhoto: string;
    tag: string;
    likes: mongoose.Types.ObjectId[];
    createdAt: Date;
}