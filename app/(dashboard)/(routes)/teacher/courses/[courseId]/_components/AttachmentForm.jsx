'use client';

import { Button } from '@/components/ui/button';

import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';
import {
  CloudIcon,
  File,
  Loader2,
  LucideUploadCloud,
  PlusCircle,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import toast from 'react-hot-toast';

function AttachmentForm({ courseAttachments, courseId }) {
  const [isEditting, setIsEditting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  console.log(courseAttachments);
  const router = useRouter();

  const onSubmit = async data => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, data);
      toast.success('Course updated');
      setIsEditting(false);
      router.refresh();
    } catch (err) {
      toast.error(`Something went wrong`);
    }
  };

  const onDelete = async id => {
    try {
      setDeletingId(id);
      await axios.delete(
        `/api/courses/${courseId}/attachments/${id}`
      );
      toast.success('Attachment deleted');
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 my-4 rounded-md bg-slate-100">
      <div className="flex items-center justify-between my-2">
        <h1 className="font-semibold">Course attachments</h1>
        <div>
          {!isEditting && (
            <div
              onClick={() => setIsEditting(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle size="20" />
              <p className="font-semibold">Add a file</p>
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
      {!isEditting && courseAttachments.length === 0 && (
        <p className="text-slate-400">no attachments yet</p>
      )}

      {courseAttachments.length > 0 && (
        <div className="space-y-2">
          {courseAttachments.map(attachment => {
            return (
              <div
                className="flex items-center gap-2 p-3 my-4 border rounded-md bg-sky-100 border-sky-200"
                key={attachment.id}
              >
                <File />
                <p className="text-xs line-clamp-1">
                  {attachment.name}
                </p>

                {deletingId === attachment.id && (
                  <div>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                )}
                {deletingId !== attachment.id && (
                  <button
                    onClick={() => onDelete(attachment.id)}
                    className="ml-auto transition hover:opacity-75"
                  >
                    <X className="w-4 h-4 " />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isEditting && (
        <div>
          <div className="flex items-center justify-center w-full">
            <LucideUploadCloud size="50" />
          </div>
          <UploadButton
            endpoint="courseAttachment"
            onClientUploadComplete={res => {
              // Do something with the response
              let url = res[0].url;

              onSubmit({ url: url });
              console.log('Files: ', res[0].url);
              alert('Upload Completed');
            }}
            onUploadError={error => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />

          <div className="mt-4 text-xs text-muted-foreground">
            Add anything your students might need to complete the
            course.
          </div>
        </div>
      )}
    </div>
  );
}

export default AttachmentForm;
