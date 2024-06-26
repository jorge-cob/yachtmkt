import connectDB from "@/config/database";
import Yacht from "@/models/Yacht";

// GET /api/yachts/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const yacht = await Yacht.findById(params.id); 

    if (!yacht) return new Response('Yacht not found', { status: 404 });

    return new Response(JSON.stringify(yacht), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};


