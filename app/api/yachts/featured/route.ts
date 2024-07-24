import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/config/database';
import Yacht from '@/models/Yacht';

// GET /api/properties/featured
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();

    const yachts: Yacht[] = await Yacht.find({ is_featured: true });

    res.status(200).json(yachts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};