import connectDB from "@/config/database";
import Yacht from "@/models/Yacht";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

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


// PUT /api/yachts/:id
export const PUT = async (request, { params }) => {

  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { id } = params;

    const { userId } = sessionUser;

    const formData = await request.formData();

    // Access all values from amenities
    const amenities = formData.getAll('amenities');

    // Get yacht to update
    const existingYacht = await Yacht.findById(id);

    if (!existingYacht) return new Response('Yacht not found', { status: 404 });

    // Verify ownership
    if (existingYacht.owner.toString() !== userId) return new Response('Unauthorized', { status: 401 });

    // Create yachtData object for database
    const yachtData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      feet: formData.get('feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        daily: formData.get('rates.daily'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };



   // Update yacht in database
    const updatedYacht = await Yacht.findByIdAndUpdate(id, yachtData);
    return new Response(JSON.stringify(updatedYacht), { status: 200 });

  } catch (error) {
    console.log('error', error);
    return new Response('Failed to add Yacht', { status: 500 });
  }


}
