import { CheckCircle, Clock } from 'lucide-react';
import ProgressCard from './_components/ProgressCard';

function Rootpage() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <ProgressCard
          icon={Clock}
          label="In Progress"
          numberOfItems={0}
        />
        <ProgressCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={0}
          variant={true}
        />
      </div>

      <div className="w-full text-center">
        <p>No course found</p>
      </div>
    </>
  );
}

export default Rootpage;
