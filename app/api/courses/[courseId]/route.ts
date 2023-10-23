import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { userId } = auth();
    const value = await req.json();
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const course = await db.course.update({
      where: { id: courseId, userId },
      data: {
        ...value,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("COURSEID");
    return new NextResponse("inernal server error", { status: 500 });
  }
}
