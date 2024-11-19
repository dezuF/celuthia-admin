import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";

export const DELETE = async (req: NextRequest, {params}: {params: { collectionId: string}}) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("unauthorized", {status: 401 })
        }

        await connectToDB()

        await Collection.findByIdAndDelete(params.collectionId)
        return new NextResponse("Collection is deleted", { status: 200 })
    } catch (err) {
        console.log("[collectionId_DELETE]", err)
        return new NextResponse("Internal error", { status: 500 })
    }
}