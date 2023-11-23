'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function PriceForm({ coursePrice, courseId }) {
  const [isEditting, setIsEditting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isLoading, isDirty },
  } = useForm({ defaultValues: { price: null } });

  const router = useRouter();

  const onSubmit = async data => {
    try {
      let dataToNum = Number(data.price);
      let newData = { price: dataToNum };

      await axios.patch(`/api/courses/${courseId}`, newData);
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
        <h1 className="font-semibold">Course price</h1>
        <div>
          {!isEditting && (
            <div
              onClick={() => setIsEditting(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Pencil size="20" />
              <p className="font-semibold">Edit price</p>
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
      {!isEditting && !coursePrice && (
        <p className="text-slate-400">No price</p>
      )}

      {coursePrice && !isEditting && <p>{`$${coursePrice}`}</p>}

      {isEditting && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="set price for your course"
            className="mb-4"
            disabled={isLoading}
            type="number"
            step="0.01"
            id="price"
            {...register('price')}
          />
          <Button disabled={isLoading || !isDirty} type="submit">
            save
          </Button>
        </form>
      )}
    </div>
  );
}

export default PriceForm;
