import Work from "@models/Work";
import User from "@models/User";

import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { query } = params;

    let works = [];

    if (query === "all") {
      works = await Work.find().poulate("creator");
    } else {
      works = await Work.find({
        $or: [
          { category: { $regex: query, $options: "i" } },
          { title: { $regex: query, $options: "i" } },
        ],
      }).populate("creator");
    }

    if (!works) return new Response("No works found", { status: 404 });

    return new Response(JSON.stringify(works), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", { status: 500 });
  }
};
