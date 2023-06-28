import axios from 'axios';
import Image from 'next/image';
import React, { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface UserProfileProps {
  name: string;
  background: string;
  bio: string;
  avatar: string;
}

const UserProfile = ({ name, background, bio, avatar }: UserProfileProps) => {
  const session = useSession();

  const router = useRouter();
  const { id } = router.query;

  const showButton = session?.data?.id === id;

  return (
    <div className='flex flex-1 mt-3 flex-col items-center  gap-5 w-full h-[calc(100vh-80px)] sticky top-0  '>
      <div
        className='w-[80%] rounded-3xl h-full max-[768px]:w-[86%]'
        style={{
          backgroundImage: background
            ? `linear-gradient(to bottom,  ${background},white)`
            : 'none',
        }}
      >
        <div className='flex border-gray-300 mt-10 w-full items-center justify-center'>
          <div
            className={`flex flex-col -mt-9 w-fit bg-${background} h-[200px] 
                  rounded-lg `}
          >
            <div className='flex h-full rounded-lg overflow-hidden '>
              <Image
                src={avatar}
                alt='avatar'
                width={200}
                height={200}
                className='h-full rounded-[50%] border-2 border-gray-300'
              />
            </div>
          </div>
        </div>
        <div className='w-full items-center justify-center mt-4 flex flex-col gap-5 ml-2'>
          <h1 className='text-3xl'>{name}</h1>
          <p className='text-md'>{bio}</p>
        </div>
        {showButton && (
          <div className='flex justify-center m-2'>
            <button
              className='bg-green-700 px-4 py-1 rounded-lg hover:bg-green-800 text-white'
              onClick={() => router.push(`/user/${session.data?.id}`)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
