import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) => {
  try {
    await connectToDB();

    const { orderId } = await context.params;

    const orderDetails = await Order.findById(orderId).populate({
      path: "products.product",
      model: Product,
    });

    if (!orderDetails) {
      return NextResponse.json({ message: "Order Not Found" }, { status: 404 });
    }

    const customer = await Customer.findOne({
      clerkId: orderDetails.customerClerkId,
    });

    return NextResponse.json({ orderDetails, customer }, { status: 200 });
  } catch (err) {
    console.error("[orderId_GET]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};