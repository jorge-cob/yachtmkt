import connectDB from "@/config/database";
import Bike from "@/models/Bike";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const bikes = await Bike.find({}); 

    return new Response(JSON.stringify(bikes), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};


