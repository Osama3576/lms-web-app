import Navbar from './_components/Navbar';
import Sidebar from './_components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="h-full">
      <div className="h-[65px] md:pl-56 fixed inset-y-0 w-full z-50 border-b  ">
        <Navbar />
      </div>

      <div className="fixed z-40 flex-col hidden h-screen border-r-2 md:flex md:w-56">
        <Sidebar />
      </div>

      <section className="md:pl-56 pt-[80px] h-full">
        {children}
      </section>
    </div>
  );
  b;
}
// absolute top-[4rem] md:left-[14rem] h-full w-full md:w-[100%] bg-slate-500
// md:pl-56 pt-[80px] h-full
