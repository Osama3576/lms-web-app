import SearchInput from '@/app/(dashboard)/_components/SearchInput';
import { Button } from '@/components/ui/button';
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from 'react-icons/fc';
const catagories = [
  {
    Icon: FcMusic,
    label: 'Music',
  },
  {
    Icon: FcOldTimeCamera,
    label: 'Photography',
  },
  {
    Icon: FcSportsMode,
    label: 'Fitness',
  },
  {
    Icon: FcSalesPerformance,
    label: 'Accounting',
  },
  {
    Icon: FcMultipleDevices,
    label: 'Computer Science',
  },
  {
    Icon: FcFilmReel,
    label: 'Filming',
  },
  {
    Icon: FcEngineering,
    label: 'Engineering',
  },
];

function Browsepage() {
  return (
    <div className="p-4">
      <div className="mb-4 w-full md:hidden">
        <SearchInput rounded backGround />
      </div>
      <div className="flex w-full gap-2 overflow-x-scroll md:overflow-x-hidden">
        {catagories.map(category => {
          let Icon = category.Icon;

          return (
            <Button
              variant="outline"
              key={category.label}
              className="rounded-full flex gap-2 items-center"
            >
              <Icon />
              <p>{category.label}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default Browsepage;
