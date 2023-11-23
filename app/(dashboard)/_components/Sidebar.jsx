import Image from 'next/image';
import Link from 'next/link';
import SidebarRoutes from './SidebarRoutes';

function Sidebar() {
  return (
    <div>
      <div className="flex md:items-center w-full md:justify-center border-b-2 p-[13px]">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width="150"
            height="150"
          />
        </Link>
      </div>
      {/* Roots */}
      <div>
        <SidebarRoutes />
      </div>
    </div>
  );
}

export default Sidebar;
