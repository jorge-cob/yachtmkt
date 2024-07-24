import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const dynamic = 'force-dynamic';

// GET /api/messages
export const GET: NextApiHandler = async (
  _req,
  res
): Promise<void> => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      res
        .status(401)
        .json({ message: 'User ID is required' });
      return;
    }

    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate('sender', 'username')
      .populate('yacht', 'name');

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 }) // Sort read messages in asc order
      .populate('sender', 'username')
      .populate('yacht', 'name');

    const messages = [...unreadMessages, ...readMessages];

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// POST /api/messages
export const POST: NextApiHandler = async (
  req: NextApiRequest | any,
  res: NextApiResponse
): Promise<void> => {
  try {
    await connectDB();

    const { name, email, phone, message, yacht, recipient } = await req.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      res
        .status(401)
        .json({ message: 'You must be logged in to send a message' });
      return;
    }

    const { user } = sessionUser;

    // Can not send message to self
    if (user.id === recipient) {
      res
        .status(400)
        .json({ message: 'Can not send a message to yourself' });
      return;
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      yacht,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    res.status(200).json({ message: 'Message Sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};