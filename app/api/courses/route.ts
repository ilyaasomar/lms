import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const { userId } = auth();
    if (!userId) {
      throw new NextResponse("unauthorized", { status: 401 });
    }
    const course = await db.course.create({ data: { userId, title } });
    return NextResponse.json(course);
  } catch (error) {
    console.log("COURSE", error);
    throw new NextResponse("internal server error", { status: 500 });
  }
}
