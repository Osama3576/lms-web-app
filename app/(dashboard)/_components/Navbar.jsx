'use client';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchInput from './SearchInput';
import { LogOut, MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Sidebar from './Sidebar';

function Navbar() {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isCoursePage = pathname?.includes('/courses');
  const isSearchPage = pathname === '/search';

  return (
    <>
      <Sheet className="md:hidden">
        <SheetTrigger className="pr-4 transition md:hidden hover:opacity-75">
          <div className="mt-4 ml-4 md:hidden">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {isSearchPage && (
        <div className="items-center hidden h-full ml-4 md:flex">
          <SearchInput rounded backGround />
        </div>
      )}
      <div className="absolute right-0 flex items-center gap-4 mr-2 top-3">
        {!isTeacherPage ? (
          <Link href="/teacher/courses">
            <Button variant="secondary">Teacher mode</Button>
          </Link>
        ) : (
          <Link href="/">
            <Button className="flex gap-2" variant="secondary">
              <LogOut />
              Exit
            </Button>
          </Link>
        )}

        <div>😂</div>

        {/* <UserButton afterSignOutUrl="/" /> */}
      </div>
    </>
  );
}

export default Navbar;
