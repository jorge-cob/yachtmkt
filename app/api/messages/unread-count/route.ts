import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextApiHandler } from 'next';

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export const GET: NextApiHandler<any> = async (req, res) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return res.status(401).json('User ID is required');
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return res.status(200).json(count);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Something went wrong');
  }
};