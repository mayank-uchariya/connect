import { connectToDB } from "@/lib/mongodb/mongoose"
import Post from "@/lib/models/Post";
export const GET = async (req: any) => {
    try {
        await connectToDB();
        const feedPost = await Post.find().populate("creator likes").exec();
        return new Response(JSON.stringify(feedPost), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 });
    }
}