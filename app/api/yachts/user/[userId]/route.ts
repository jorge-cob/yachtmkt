import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "@/config/database";
import Yacht from "@/models/Yacht";

// GET /api/yachts/user/:userId
export const GET = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    await connectDB();

    const { userId } = request.query;
    if (!userId) {
      return response.status(400).send('User ID is required');
    }

    const yachts: Yacht[] = await Yacht.find({ owner: userId }); 

    return response.status(200).json(yachts);
  } catch (error) {
    console.log(error);
    return response.status(500).send('Something went wrong');
  }
};
