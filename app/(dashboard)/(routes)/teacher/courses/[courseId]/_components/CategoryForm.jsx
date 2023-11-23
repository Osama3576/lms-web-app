'use client';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/comboBox';

import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import toast from 'react-hot-toast';

function CategoryForm({ courseCategory, courseId, categories }) {
  const [isEditting, setIsEditting] = useState(false);
  const [value, setValue] = useState('');
  const [id, setId] = useState('');

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
  const selectedOption = categories.find(
    category => category.id === courseCategory
  );
  return (
    <div className="p-4 my-4 rounded-md bg-slate-100">
      <div className="flex items-center justify-between my-2">
        <h1 className="font-semibold">Course category</h1>
        <div>
          {!isEditting && (
            <div
              onClick={() => setIsEditting(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Pencil size="20" />
              <p className="font-semibold">Edit Category</p>
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
      {!isEditting && !courseCategory && (
        <p className="text-slate-400">No category</p>
      )}

      {!isEditting && <p>{selectedOption?.name}</p>}

      {isEditting && (
        <div>
          <Combobox
            setId={setId}
            value={value}
            setValue={setValue}
            categories={categories}
          />
          <Button
            className="block mt-4"
            disabled={!value}
            type="button"
            onClick={() => onSubmit({ categoryId: id })}
          >
            save
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryForm;
