'use client';

import ListPreview from '../lists/ListPreview';
import { PostType } from '../lists/page';
import { useEffect, useState } from 'react';

export default function RecentPost() {
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/getRecentPost')
      .then((r) => r.json())
      .then((result) => setData(result));
  }, []);
  return (
    <div className='mx-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 p-4 lg:mx-16 lg:max-w-none lg:grid-cols-3'>
      {data.map((item: PostType, i: number) => (
        <ListPreview {...item} key={i} />
      ))}
    </div>
  );
}
