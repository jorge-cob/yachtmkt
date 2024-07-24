import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/config/database";
import Yacht from "@/models/Yacht";

// GET /api/yachts/user/:userId
export const GET = async (request: NextApiRequest, { params }: { params: { userId: string } }): Promise<Response> => {

  try {
    await connectDB();

    const userId = params.userId;
    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const yachts: Yacht[] = await Yacht.find({ owner: userId }); 
    console.log(yachts);

    return new Response(JSON.stringify(yachts), { status: 200 });    
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });  }
};
