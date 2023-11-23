import SearchInput from '@/app/(dashboard)/_components/SearchInput';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

import Link from 'next/link';
import TableData from './_components/TableData';

function Coursepage() {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <SearchInput />
        <Link href="/teacher/create">
          <Button className="flex items-center gap-2">
            <PlusCircle size="15" />
            New Courses
          </Button>
        </Link>
      </div>

      <div>
        <TableData />
      </div>
    </div>
  );
}

export default Coursepage;
