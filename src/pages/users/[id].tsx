import UserProfile from '@/components/UserProfile';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { User } from '@/types/types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';
import { getNetworkName, getUsernameFromLink } from '@/utils/linkUtils';

const UserPage = ({ data }: { data: User }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  const [layout, setLayout] = useState(data.layout);

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const router = useRouter();

  return (
    <>
      <div className='mt-6 mx-12 flex justify-center  max-[768px]:flex-col'>
        <UserProfile
          name={data.name}
          avatar={data.avatar}
          bio={data.bio}
          background={data.background}
        />
        <ResponsiveGridLayout
          className='flex flex-[2_2_0%] w-full -mt-6'
          layouts={{ lg: data.layout }}
          breakpoints={{ lg: 1200, md: 768, xs: 480 }}
          cols={{ lg: 4, md: 4, sm: 1, xs: 1 }}
          rowHeight={30}
          width={976}
          margin={[40, 40]}
          useCSSTransforms={false}
          isDraggable={false}
          isResizable={false}
        >
          {layout?.map((item) => (
            <div key={item.i} className='rounded-3xl hover:shadow-md '>
              <div className='border-2 rounded-3xl h-full w-full px-3 py-3  '>
                <div className='container '>
                  <div
                    className='rounded-2xl px-2 py-2 h-full w-full   text-black overflow-hidden text-xl'
                    style={{
                      backgroundColor: item.background,
                      textAlign: item.textAlignment,
                    }}
                  >
                    {item.type == 'Add Note' && <>{item.text}</>}
                    {item.type === 'image' && (
                      <Image
                        src={item.layoutImage!}
                        alt='layout-image'
                        fill={true}
                        className='rounded-xl hover:bg-gray-100'
                      />
                    )}
                    {item.type === 'link' && (
                      <div className='flex items-center justify-center h-full w-full flex-col cursor-pointer'>
                        <SocialIcon
                          url={`//${item.link?.replace(
                            '/localhost:3000/user/',
                            ''
                          )}`}
                          network={getNetworkName(item.link)}
                          target='_blank'
                        />
                        <h2 className='text-lg'>
                          @{getUsernameFromLink(item.link!)}
                        </h2>
                      </div>
                    )}
                  </div>{' '}
                </div>
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
        <div className='w-full gap-5 flex fixed bottom-4 left-12 right-0 mt-2  max-[768px]:left-3'>
          <button
            className='bg-teal-600 text-white rounded-lg px-2 py-1  max-[768px]:text-orientation '
            onClick={() => router.push('/community')}
          >
            Community
          </button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { id } = context.query;
  const { id } = params as ParsedUrlQuery;
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`);
  const data = await res.json();

  return { props: { data } };
};

export default UserPage;
