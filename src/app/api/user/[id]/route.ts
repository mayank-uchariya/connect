import { connectToDB } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/Users";

export const GET = async (req: Request, { params }: any) => {
    try {
        await connectToDB();
        const user = await User.findOne({ clerkId: params.id }).populate("posts savedPosts likedPosts followers following").exec();
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 });
    }
}