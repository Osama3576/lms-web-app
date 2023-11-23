'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DragableChapters from './DragableChapters';

function ChapterForm({ courseChapters, courseId }) {
  console.log(courseChapters);
  const [isEditting, setIsEditting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isLoading, isDirty },
  } = useForm({ defaultValues: { title: '' } });

  const router = useRouter();

  const onSubmit = async data => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, data);
      toast.success('Course updated');
      setIsEditting(false);
      router.refresh();
    } catch (err) {
      toast.error(`Something went wrong${err}`);
    }
  };

  return (
    <div className="p-4 my-4 rounded-md bg-slate-100">
      <div className="flex items-center justify-between my-2">
        <h1 className="font-semibold">Course chapters</h1>
        <div>
          {!isEditting && (
            <div
              onClick={() => setIsEditting(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle size="20" />
              <p className="font-semibold">Add a Chapter</p>
            </div>
          )}

          {isEditting && (
            <Button
              onClick={() => setIsEditting(false)}
              variant="ghost"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Form */}

      {!isEditting && courseChapters.length === 0 && (
        <p>No chapters</p>
      )}
      {!isEditting && <DragableChapters />}

      {isEditting && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="mb-4"
            disabled={isLoading}
            placeholder="e.g. 'Introduction to the course'"
            type="text"
            id="title"
            {...register('title')}
          />
          <Button disabled={isLoading} type="submit">
            create
          </Button>
        </form>
      )}
    </div>
  );
}

export default ChapterForm;
