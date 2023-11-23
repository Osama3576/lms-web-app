'use client';

import { Button } from '@/components/ui/button';

import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function DescreptionForm({ courseDescreption, courseId }) {
  const [isEditting, setIsEditting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isLoading, isDirty },
  } = useForm({ defaultValues: { description: courseDescreption } });

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
        <h1 className="font-semibold">Course description</h1>
        <div>
          {!isEditting && (
            <div
              onClick={() => setIsEditting(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Pencil size="20" />
              <p className="font-semibold">Edit description</p>
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
      {!isEditting && !courseDescreption ? (
        <p className="text-slate-400">No description</p>
      ) : (
        <p>{courseDescreption}</p>
      )}

      {isEditting && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            placeholder="e.g 'This course is about...'"
            className="mb-4"
            disabled={isLoading}
            type="text"
            id="description"
            {...register('description')}
          />
          <Button disabled={isLoading || !isDirty} type="submit">
            save
          </Button>
        </form>
      )}
    </div>
  );
}

export default DescreptionForm;
