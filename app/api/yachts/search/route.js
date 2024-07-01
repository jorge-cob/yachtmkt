import connectDB from '@/config/database';
import Yacht from '@/models/Yacht';

// GET /api/yachts/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const yachtType = searchParams.get('yachtType');

    const locationPattern = new RegExp(location, 'i');

    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };

    // Only check for yacht if its not 'All'
    if (yachtType && yachtType !== 'All') {
      const typePattern = new RegExp(yachtType, 'i');
      query.type = typePattern;
    }

    const yachts = await Yacht.find(query);

    return new Response(JSON.stringify(yachts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};