import { db } from '@/lib/db';
import TitleForm from './_components/TitleForm';
import { IconBadge } from '@/components/IconBadge';
import {
  DollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react';
import DescreptionForm from './_components/DescreptionForm';
import ImageForm from './_components/ImageForm';
import CategoryForm from './_components/CategoryForm';
import ChapterForm from './_components/ChapterForm';
import PriceForm from './_components/PriceForm';
import AttachmentForm from './_components/AttachmentForm';

async function courseIdPage({ params }) {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: 'asc',
        },
      },
      attachments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  const category = await db.category.findMany();

  const chapters = await db.chapter.findMany({
    where: {
      courseId: params.courseId,
    },
  });

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-xl">Course Setup</h1>
        <p className="text-sm">
          Complete all fields {completionText}
        </p>
      </div>

      {/*All  FORMS */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Left Side */}
        <div className="mt-[3.5rem]">
          <div className="flex items-center gap-4 mb-4">
            <IconBadge icon={LayoutDashboard} />
            <p>Customize your course</p>
          </div>
          <TitleForm
            courseId={course.id}
            courseTitle={course.title}
          />
          <DescreptionForm
            courseId={course.id}
            courseDescreption={course.description}
          />
          <ImageForm
            courseId={course.id}
            courseImage={course.imageUrl}
          />
          <CategoryForm
            courseId={course.id}
            courseCategory={course.categoryId}
            categories={category}
          />
        </div>

        {/* Right side */}
        <div className="mt-[3.5rem]">
          <div className="flex items-center gap-4 mb-4">
            <IconBadge icon={ListChecks} />
            <p>Course chapters</p>
          </div>

          <ChapterForm
            courseId={course.id}
            courseChapters={chapters}
          />

          <div className="flex items-center gap-4 my-4 mb-4">
            <IconBadge icon={DollarSign} />
            <p>Sell your course</p>
          </div>

          <PriceForm
            courseId={course.id}
            coursePrice={course.price}
          />

          <div className="flex items-center gap-4 my-4 mb-4">
            <IconBadge icon={File} />
            <p>Resources & Attachments</p>
          </div>
          <AttachmentForm
            courseId={course.id}
            courseAttachments={course.attachments}
          />
        </div>
      </div>
    </div>
  );
}

export default courseIdPage;
