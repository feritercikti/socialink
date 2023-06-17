import UserProfile from '@/components/UserProfile';
import { GetServerSideProps } from 'next';

import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';

interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minWidth: number;
  selectedButton: string;
  selectedSubButton: string;
  textAlignment: 'left' | 'center' | 'right';
  background: string;
  text: string;
}

interface User {
  _id: number;
  name: string;
  avatar: string;
  bio: string;
  background: string;
  layout: Layout[];
}

const UserPage = ({ data }: { data: User }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  const [layout, setLayout] = useState(data.layout);

  return (
    <>
      <div className='mt-6 mx-12 flex justify-center'>
        <UserProfile
          name={data.name}
          avatar={data.avatar}
          bio={data.bio}
          background={data.background}
        />
        <GridLayout
          className='flex flex-[2_2_0%] w-full -mt-6'
          layout={data.layout}
          cols={4}
          rowHeight={30}
          width={976}
          margin={[40, 40]}
          useCSSTransforms={false}
          isDraggable={false}
          isResizable={false}
        >
          {layout.map((item) => (
            <div
              key={item.i}
              className='rounded-3xl hover:bg-gray-300  bg-white'
            >
              <div className='border-2 rounded-3xl h-full w-full px-3 py-3  '>
                <div className='textarea-container hover:bg-gray-300 '>
                  <div
                    className='text-area-hover rounded-2xl px-2 py-2 h-full w-full hover:bg-gray-300  text-black overflow-hidden text-xl'
                    style={{
                      backgroundColor: item.background,
                      textAlign: item.textAlignment,
                    }}
                  >
                    {item.text}
                  </div>{' '}
                </div>
              </div>
            </div>
          ))}
        </GridLayout>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const data = await res.json();

  return { props: { data } };
};

export default UserPage;
