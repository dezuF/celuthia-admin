import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { title, description, image } = await req.json();

    // Validación inicial
    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    await connectToDB();

    // Evitar duplicados
    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    const newCollection = new Collection({ title, description, image });
    
    await newCollection.save();

    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    console.error("[collections_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
