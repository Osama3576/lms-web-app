'use client';

import { Button } from '@/components/ui/button';

import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';
import { ImageIcon, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import toast from 'react-hot-toast';

function ImageForm({ courseImage, courseId }) {
  const [isEditting, setIsEditting] = useState(false);

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
        <h1 className="font-semibold">Course image</h1>
        <div>
          {!isEditting && (
            <div
              onClick={() => setIsEditting(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle size="20" />
              <p className="font-semibold">Add an Image</p>
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
      {!isEditting && !courseImage ? (
        <div className="bg-slate-300 h-[10rem] flex items-center justify-center">
          <ImageIcon size="50" className="opacity-50" />
        </div>
      ) : (
        <div className="relative mt-2 aspect-video">
          <Image
            alt="Upload"
            fill
            className="object-cover rounded-md"
            src={courseImage}
          />
        </div>
      )}

      {isEditting && (
        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={res => {
              // Do something with the response
              let url = res[0].url;

              onSubmit({ imageUrl: url });
              console.log('Files: ', res[0].url);
              alert('Upload Completed');
            }}
            onUploadError={error => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageForm;
