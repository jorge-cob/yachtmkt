import connectDB from '@/config/database';
import Yacht from '@/models/Yacht';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';
import { NextRequest, NextResponse } from 'next/server'

// GET /api/yachts
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const page =  parseInt((request.nextUrl.searchParams.get('page') || '1'), 10);
    const pageSize =  parseInt((request.nextUrl.searchParams.get('pageSize') || '6'), 10);
    const skip = (page - 1) * pageSize;

    const total = await Yacht.countDocuments({});
    const yachts = await Yacht.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      yachts,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {

  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    // Access all values from amenities and images
    const amenities = formData.getAll('amenities');
  
    const imageArray = formData.getAll('images') as File[];
    const imagesFiles = Array.from(imageArray).filter((image: File) => image.name !== '');

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
        nightly: formData.get('rates.nightly.'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
      images: [] as string[],
    };

    // Upload image(s) to Cloudinary
    const imageUploadPromises = [];

    for (const image of imagesFiles) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString('base64');

      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'yachtmkt',
        }
      );

      console.log('image to cloudinary', result.secure_url)

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      // Add uploaded images to the yachtData object
      yachtData.images = uploadedImages;
    }

    const newYacht = new Yacht(yachtData);
    await newYacht.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/yachts/${newYacht._id}`
    );

    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.log('error' , error);
    return new Response('Failed to add yacht', { status: 500 });
  }
};