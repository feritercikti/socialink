import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <Link
        href='/community'
        className='w-full px-10 flex items-center justify-center py-5 bg-[#921e9d] hover:bg-[#701a75] cursor-pointer'
      >
        <h2 className='text-white cursor-pointer'>Explore</h2>
      </Link>
      <div className='my-8 flex items-center flex-col'>
        <img src='/heroImg.png' className='h-20 w-20' />
        <h2 className='mt-4 text-xl font-bold'>Zento</h2>
      </div>
      <div className='flex  text-center flex-col gap-2'>
        <h1 className='text-6xl font-bold'>A Link in Bio.</h1>
        <h1 className='text-6xl font-bold'>But Rich and Beautiful.</h1>
        <h3 className='text-2xl text-gray-500 font-thin my-2'>
          Your personal page to show everything you are and create.
        </h3>
      </div>
      <div className='flex flex-col items-center justify-center mt-12 gap-6'>
        <Link
          href='/register'
          className='text-white px-16 py-5 text-xl font-bold bg-[#921e9d] hover:bg-[#701a75] rounded-xl '
        >
          Create Your Zento
        </Link>
        <Link className='text-[14px] cursor-pointer' href='/login'>
          Log In
        </Link>
      </div>
      <div className='my-[100px] w-full flex items-center justify-center'>
        <Image
          src='/zento.gif'
          alt='Zento'
          height={900}
          width={900}
          className='px-4 py-4 bg-[#921e9d72] rounded-xl '
        />
      </div>
    </div>
  );
}
