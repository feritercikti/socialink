import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import GridLayout from 'react-grid-layout';
import Profile from '@/components/Profile';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiRectangle } from 'react-icons/bi';
import { LuRectangleHorizontal, LuRectangleVertical } from 'react-icons/lu';
import { BsThreeDots } from 'react-icons/bs';

const inter = Inter({ subsets: ['latin'] });
type Position = {
  xRate: number;
  yRate: number;
};

export default function Home() {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 4, minW: 1, maxW: 4, minH: 2, maxH: 4 },
    { i: 'b', x: 1, y: 0, w: 2, h: 3, minW: 1, maxW: 4, minH: 3, maxH: 4 },
    { i: 'c', x: 4, y: 0, w: 2, h: 3, minW: 1, maxW: 4, minH: 3, maxH: 4 },
    { i: 'd', x: 4, y: 0, w: 2, h: 3, minW: 1, maxW: 4, minH: 3, maxH: 4 },
  ];

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemHover = (key: string) => {
    setHoveredItem(key);
  };

  const handleItemHoverEnd = () => {
    setHoveredItem(null);
  };

  return (
    <div className='my-16 mx-12 flex justify-center'>
      <Profile />
      <GridLayout
        className='flex flex-[2_2_0%] w-full '
        layout={layout}
        cols={4}
        rowHeight={30}
        width={976}
      >
        <div
          key='a'
          className='rounded-lg'
          onMouseEnter={() => handleItemHover('a')}
          onMouseLeave={handleItemHoverEnd}
        >
          <div className='border-2 rounded-lg border-gray-200 h-full w-full px-2 py-2 relative '>
            <textarea
              placeholder='Add Note'
              className='h-full w-full rounded-lg px-2 py-1 outline-none hover:bg-gray-100 hover:text-black text-align-top resize-none overflow-hidden'
            />
            {hoveredItem === 'a' && (
              // <AiOutlineDelete className='absolute -top-2 -left-4 rounded-[50%] bg-white border border-gray-200 text-[24px]' />
              <>
                <div className='absolute -top-4 -left-4'>
                  <div className='bg-white border border-gray-200 w-[36px] h-[36px] rounded-[50%] flex items-center justify-center '>
                    <button>
                      <AiOutlineDelete className='text-[18px]' />
                    </button>
                  </div>
                </div>
                <div className='absolute bottom-0 left-0 flex bg-black rounded-lg items-center justify-center w-full py-2 gap-1'>
                  <div className=' bg-white border border-gray-200 w-[24px] h-[24px] flex items-center justify-center rounded-sm'>
                    <BiRectangle size={8} />
                  </div>
                  <div className='bg-white border border-gray-200 w-[24px] h-[24px]  flex items-center justify-center rounded-sm '>
                    <LuRectangleHorizontal size={12} />
                  </div>
                  <div className='bg-white border border-gray-200 w-[24px] h-[24px] ] flex items-center justify-center rounded-sm '>
                    <LuRectangleVertical size={12} />
                  </div>
                  <div className='bg-white border border-gray-200 w-[24px] h-[24px] ] flex items-center justify-center rounded-sm '>
                    <BiRectangle className='text-[24px]' />
                  </div>
                  <span className='h-3 bg-gray-600 w-[1px] ml-1'></span>
                  <div className='text-white  w-[24px] h-[24px] ] flex items-center justify-center rounded-sm '>
                    <BsThreeDots size={18} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div key='b' className='bg-gray-500'>
          b
        </div>
        <div key='c' className='bg-gray-500'>
          c
        </div>
        <div key='d' className='bg-gray-500'>
          c
        </div>
      </GridLayout>
    </div>
  );
}
