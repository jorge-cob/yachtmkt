import connectDB from "@/config/database";
import Yacht from "@/models/Yacht";

// GET /api/yachts/featured
export const GET = async (request) => {
  try {
    await connectDB();
    
    const yachts = await Yacht.find({
      is_featured: true
    }); 

    return new Response(JSON.stringify(yachts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
