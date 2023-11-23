'use client';
import { BarChart, Compass, Layout, List } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const guestRoutes = [
  {
    Icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    Icon: Compass,
    label: 'Browse',
    href: '/search',
  },
];

const teacherRoutes = [
  {
    Icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    Icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
];

function SidebarRoutes() {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes('/teacher');

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {routes.map(route => {
        let Icon = route.Icon;
        const isActive =
          (pathname === '/' && route.href === '/') ||
          pathname === route.href ||
          pathname?.startsWith(`${route.href}/`);
        return (
          <Link
            href={route.href}
            key={route.label}
            className={` p-4 hover:text-slate-600 hover:bg-slate-300/20 w-full flex gap-4 ${
              isActive &&
              'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 border-r-4 border-sky-700'
            }`}
          >
            <Icon />
            {route.label}
          </Link>
        );
      })}
    </div>
  );
}

export default SidebarRoutes;
