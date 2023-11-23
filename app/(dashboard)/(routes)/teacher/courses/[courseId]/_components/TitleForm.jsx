'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function TitleForm({ courseTitle, courseId }) {
  const [isEditting, setIsEditting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isLoading, isDirty },
  } = useForm({ defaultValues: { title: courseTitle } });

  const router = useRouter();

  const onSubmit = async data => {
    try {
      await axios.patch(`/api/courses/${courseId}`, data);
      toast.success('Course updated');
      setIsEditting(false);
      router.refresh();
    } catch (err) {
      toast.error(`Something went wrong`);
    }
  };

  return (
    <div className="p-4 my-4 rounded-md bg-slate-100">
      <div className="flex items-center justify-between my-2">
        <h1 className="font-semibold">Course title</h1>
        <div>
          {!isEditting && (
            <div
              onClick={() => setIsEditting(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Pencil size="20" />
              <p className="font-semibold">Edit title</p>
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
      {!isEditting && <div>{courseTitle}</div>}

      {isEditting && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="mb-4"
            disabled={isLoading}
            type="text"
            id="title"
            {...register('title')}
          />
          <Button disabled={isLoading} type="submit">
            save
          </Button>
        </form>
      )}
    </div>
  );
}

export default TitleForm;
