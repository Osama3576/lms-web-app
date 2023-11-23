// import { auth } from "@clerk/nextjs";
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

// import { isTeacher } from '@/lib/teacher';

export async function POST(req) {
  try {
    // const { userId } = auth();
    const { title } = await req.json();

    const userId = '3576';

    // if (!userId || !isTeacher(userId)) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
