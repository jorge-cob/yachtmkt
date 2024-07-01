import connectDB from "@/config/database";
import User from "@/models/User";
import Yacht from "@/models/Yacht";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// GET /api/bookmarks
export const GET = async () => {
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

export const POST = async (request) => {
  try {
    await connectDB();
    const { yachtId } = await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in DB 
    const user = await User.findOne({_id: userId});

    // Check if yacht is bookmarked
    let isBookmarked = user.bookmarks.includes(yachtId);

    let message;

    if (isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks.pull(yachtId);
      message = 'Removed from bookmarks';
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      user.bookmarks.push(yachtId);
      message = 'Added to bookmarks';
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
