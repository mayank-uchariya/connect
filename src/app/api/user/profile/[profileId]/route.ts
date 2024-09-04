import { connectToDB } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/Users";
import Post from "@/lib/models/Post";

export const GET = async ( req:any ,{ params }: any) => {
    try {
        await connectToDB();
        const user = await User.findById(params.profileId)
            .populate({
                path: "posts savedPosts likedPosts",
                model : Post,
                populate : {
                    path : 'creator',
                    model : User,
                }
            }).populate({
                path: "followers following",
                model : User,
                populate : {
                    path : 'posts savedPosts likedPosts',
                    model : Post,
                }
            })
            .exec();
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response("User not found", { status: 500 });
    }
};