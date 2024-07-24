import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/config/database';
import Yacht from '@/models/Yacht';

// GET /api/properties/featured
export const GET = async (request: NextApiRequest | any): Promise<Response> => {

  try {
    await connectDB();

    const yachts: Yacht[] = await Yacht.find({ is_featured: true });

    return new Response(JSON.stringify(yachts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
