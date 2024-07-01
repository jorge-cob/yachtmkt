import connectDB from "@/config/database";
import Yacht from "@/models/Yacht";
import { getSessionUser } from "@/utils/getSessionUser";

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

// DELETE /api/yachts/:id
export const DELETE = async (request, { params }) => {
  try {
    const yachtId = params.id;
    const sessionUser = await getSessionUser();
    // Check for session

    if (!sessionUser || !sessionUser) return new Response('User ID is required', { status: 401 });

    const {userId} = sessionUser;

    await connectDB();


    const yacht = await Yacht.findById(yachtId); 

    if (!yacht) return new Response('Yacht not found', { status: 404 });

    // Verify ownership
    if (yacht.owner.toString() !== userId) return new Response('Unauthorized', { status: 401 });

    await yacht.deleteOne();

    return new Response('Yacht deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
