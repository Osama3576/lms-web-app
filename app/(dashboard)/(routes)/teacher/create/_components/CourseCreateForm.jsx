'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
export function CourseCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { isLoading, isDirty },
  } = useForm({ defaultValues: { title: '' } });

  const router = useRouter();

  const onSubmit = async data => {
    try {
      const response = await axios.post('/api/courses', data);
      console.log(response);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success('Course created');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-[40rem] "
    >
      <h1 className="text-2xl">Name your course</h1>
      <p className="mb-6 text-sm ">
        What would you like to name your course? Dont worry, you can
        change this later.
      </p>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-8">
        <Label className="mb-2" htmlFor="email">
          Course title
        </Label>
        <Input
          disabled={isLoading}
          type="text"
          id="title"
          {...register('title')}
          placeholder="e.g. Advanced web development"
        />
        <p>What will you teach in this course?</p>
      </div>

      <div className="flex gap-4">
        <Link href="/">
          <Button variant="ghost">Cancel</Button>
        </Link>

        <Button disabled={isLoading || !isDirty} type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}
