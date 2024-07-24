import connectDB from '@/config/database';
import User from '@/models/User';
import Yacht from '@/models/Yacht';
import { getSessionUser } from '@/utils/getSessionUser';

export const GET = async (): Promise<Response> => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Get users bookmarks
    const bookmarks = await Yacht.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (request: Request): Promise<Response> => {
  try {
    await connectDB();

    const { yachtId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if yacht is bookmarked
    let isBookmarked = user.bookmarks.includes(yachtId);

    let message;

    if (isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks.pull(yachtId);
      message = 'Bookmark removed successfully';
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      user.bookmarks.push(yachtId);
      message = 'Bookmark added successfully';
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};