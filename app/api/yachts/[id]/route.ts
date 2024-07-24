import connectDB from "@/config/database";
import Yacht from "@/models/Yacht";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

// GET /api/yachts/:id
export const GET = async (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  try {
    await connectDB();

    const yacht = await Yacht.findById(params.id); 

    if (!yacht) return NextResponse.json('Yacht not found', { status: 404 });

    return new NextResponse(JSON.stringify(yacht), { status: 200 });
    
  } catch (error) {
    console.log(error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};

// DELETE /api/yachts/:id
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> => {
  try {
    const yachtId = params.id;
    await connectDB();

    const yacht = await Yacht.findByIdAndDelete(yachtId);

    if (!yacht) return new NextResponse('Yacht not found', { status: 404 });

    return new NextResponse(JSON.stringify({ message: 'Yacht deleted successfully' }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Something went wrong', { status: 500 });
  }
};