import { Layout } from '@/types/types';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface User {
  _id: number;
  name: string;
  cover: string;
  layout: Layout[];
}

const Community = ({ data }: { data: User[] }) => {
  const router = useRouter();

  const session = useSession();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center  bg-gray-100 h-screen'>
      <div
        className='flex w-full items-center justify-between 
         px-8 h-12 py-1 mb-6 mt-12'
      >
        <div>
          <button
            className='hover:text-gray-400'
            onClick={() => router.push('/')}
          >
            Home
          </button>
        </div>
        <div className='flex gap-8'>
          {session.data && (
            <>
              <button
                className='hover:text-gray-400'
                onClick={() => router.push(`/users/${session.data?.id}`)}
              >
                My Page
              </button>

              <button className='hover:text-gray-400' onClick={() => signOut()}>
                Logout
              </button>
            </>
          )}
          {!session.data && (
            <button
              className='hover:bg-[#701a75] bg-[#921e9d] text-white px-5 py-2 rounded-xl'
              onClick={() => router.push('/login')}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <h2 className='text-3xl mb-6'>Explore</h2>
      <div>
        <div className='grid grid-cols-3 content-start gap-12 w-full md:grid-cols-2 lg:grid-cols-3 max-sm:grid-cols-1 max-[476px]:grid-cols-1 justify-center'>
          {data?.map((user) => {
            if (user.name) {
              return (
                <div
                  key={user._id}
                  className='border text-center max-w-[400px] items-center  hover:shadow-lg rounded-lg cursor-pointer'
                >
                  <Link href={`/users/${user._id}`}>
                    <img src={user.cover} alt={user.name} />
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.URL}/api/users`);
  const data = await res.json();

  return { props: { data } };
}

export default Community;
