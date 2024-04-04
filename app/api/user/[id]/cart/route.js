import User from "@models/User";
import { connectToDB } from "@mongodb/database";

export const POST = async (req, { params }) => {
  try {
    const { cart } = await req.json();
    await connectToDB();
    const userId = params.id;
    const user = await User.findById(userId);
    user.cart = cart;
    await user.save();
    return new Response(JSON.stringify(user.cart), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update cart", { status: 500 });
  }
};
