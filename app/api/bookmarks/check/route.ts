import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request): Promise<Response> => {
  try {
    await connectDB();

    const { yachtId } = await request.json() as { yachtId: string };

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    // Find user in database
    const user = await User.findById(sessionUser.userId).select('bookmarks');

    // Check if yacht is bookmarked
    const isBookmarked = user.bookmarks.some((bookmark: string) => bookmark === yachtId);
    
    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};