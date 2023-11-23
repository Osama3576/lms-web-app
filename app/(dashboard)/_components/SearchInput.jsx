'use client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

function SearchInput({ rounded, backGround }) {
  const [value, setValue] = useState('');
  return (
    <div className="relative">
      <Search className="absolute w-4 h-4 top-3 left-3 text-slate-600" />
      <Input
        onChange={e => setValue(e.target.value)}
        value={value}
        className={`w-full md:w-[300px] pl-9  focus-visible:ring-slate-200 ${
          rounded && 'rounded-full'
        } ${backGround && 'bg-slate-100'}`}
        placeholder="Search for a course"
      />
    </div>
  );
}

export default SearchInput;
