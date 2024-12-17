import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ collectionId: string }> }
) {
  try {
    await connectToDB();

    const { collectionId } = await context.params;

    const collection = await Collection.findById(collectionId).populate({
      path: "products",
      model: Product,
    });

    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.error("[collectionId_GET]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const { collectionId } = await context.params;

    let collection = await Collection.findById(collectionId);

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return NextResponse.json(
        { error: "Title and image are required" },
        { status: 400 }
      );
    }

    collection = await Collection.findByIdAndUpdate(
      collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.error("[collectionId_POST]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();

    const { collectionId } = await context.params;

    await Collection.findByIdAndDelete(collectionId);

    return NextResponse.json(
      { message: "Collection is deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[collectionId_DELETE]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
