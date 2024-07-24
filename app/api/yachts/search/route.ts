import connectDB from '@/config/database';
import Yacht from '@/models/Yacht';

// GET /api/yachts/search
export const GET = async (request: Request): Promise<Response> => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location: string | null = searchParams.get('location');
    const yachtType: string | null = searchParams.get('yachtType');

    const locationPattern: RegExp = new RegExp(location || '', 'i');
    console.log('yyyuuuup');
    // Match location pattern against database fields
    let query: { $or: { [key: string]: RegExp }[]; type?: RegExp } = {
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
      const typePattern: RegExp = new RegExp(yachtType, 'i');
      query.type = typePattern;
    }

    const yachts: Yacht[] = await Yacht.find(query);

    return new Response(JSON.stringify(yachts), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};