import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface User {
  _id: number;
  name: string;
  cover: string;
}

const Community = ({ data }: { data: User[] }) => {
  const router = useRouter();

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex items-center justify-center mt-16'>
      <div className='grid grid-cols-3 gap-14'>
        {data.map((user) => (
          <div
            key={user._id}
            className='border p-3 text-center w-[400px] hover:shadow-lg cursor-pointer'
          >
            <Link href={`/users/${user._id}`}>
              <img src={user.cover} alt={user.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/users');
  const data = await res.json();

  return { props: { data } };
}

export default Community;
