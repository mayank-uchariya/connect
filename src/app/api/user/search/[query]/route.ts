import User from "@/lib/models/Users";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (req: any, { params }: any) => {
    try {
        await connectToDB();
        const { query } = params;
        const searchPeople = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
            ],
        }).populate("posts savedPosts likedPosts followers following").exec();
        return new Response(JSON.stringify(searchPeople), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Post is not found", { status: 500 });
    }
}