import UserProfile from '@/components/UserProfile';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { User } from '@/types/types';

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
              className='rounded-3xl hover:shadow-md cursor-pointer'
            >
              <div className='border-2 rounded-3xl h-full w-full px-3 py-3  '>
                <div className='textarea-container '>
                  <div
                    className='rounded-2xl px-2 py-2 h-full w-full   text-black overflow-hidden text-xl'
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { id } = context.query;
  const { id } = params as ParsedUrlQuery;
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const data = await res.json();

  return { props: { data } };
};

export default UserPage;
