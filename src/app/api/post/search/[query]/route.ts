import Post from "@/lib/models/Post";
import { connectToDB } from "@/lib/mongodb/mongoose";

export const GET = async (req: any, { params }: any) => {
    try {
        await connectToDB();
        const { query } = params;
        const searchPost = await Post.find({
            $or: [
                { caption: { $regex: query, $options: 'i' } },
                { tag: { $regex: query, $options: 'i' } },
            ],
        }).populate("creator likes").exec();
        return new Response(JSON.stringify(searchPost), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Post is not found", { status: 500 });
    }
}