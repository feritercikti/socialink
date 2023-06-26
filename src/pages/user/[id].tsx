import React, { useEffect } from 'react';
import { useState, useCallback, useContext, useRef } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import Profile from '@/components/Profile';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiRectangle } from 'react-icons/bi';
import { LuRectangleHorizontal, LuRectangleVertical } from 'react-icons/lu';
import { BsThreeDots } from 'react-icons/bs';
import { ThemeContext } from '@/ThemeContext';
import Menu from '@/components/Menu';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CaptureImage } from '@/utils/imageUtils';
import { GetServerSideProps } from 'next';
import { User } from '@/types/types';
import LinkModal from '@/components/LinkModal';
import TextArea from '@/components/TextArea';
import SocialLink from '@/components/SocialLink';
import ImageLayout from '@/components/ImageLayout';

type TextAlign = 'left' | 'right' | 'center';

const defaultLayout = [
  {
    i: 'a',
    x: 0,
    y: 0,
    w: 1,
    h: 3,
    minWidth: 1,
    selectedButton: 'biRectangle',
    selectedSubButton: 'luAlignLeft',
    textAlignment: 'left' as TextAlign,
    background: 'white',
    text: 'Add Note',
    type: 'type',
    link: '',
    layoutImage: '/default.jpeg',
  },
  {
    i: 'b',
    x: 1,
    y: 0,
    w: 2,
    h: 2,
    minWidth: 1,
    selectedButton: 'luRectangleHorizontal',
    selectedSubButton: 'luAlignLeft',
    textAlignment: 'left' as TextAlign,
    background: 'white',
    text: 'Add Note',
    type: 'type',
    link: '',
    layoutImage: '/default.jpeg',
  },
];

const User = ({ data }: { data: User }) => {
  const [layout, setLayout] = useState(data.layout || defaultLayout);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [name, setName] = useState(data.name);
  const [bio, setBio] = useState(data.bio);
  const [avatar, setAvatar] = useState(data.avatar);
  const [avatarUploaded, setAvatarUploaded] = useState(data.avatarUploaded);
  const [imageColors, setImageColors] = useState<string[]>(data.imageColors);
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [background, setBackground] = useState<string>(
    data.background ? data.background : ''
  );
  const [saveStatus, setSaveStatus] = useState('Save');

  const { darkTheme, toggleDarkTheme } = useContext(ThemeContext);

  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { id } = router.query;

  const handleToggleTheme = () => {
    toggleDarkTheme();
  };

  const handleAddItem = (type: string, link?: string, layoutImage?: string) => {
    const newItem = {
      i: `item_${layout.length}`,
      x: 0,
      y: 0,
      w: 1,
      h: 3,
      minWidth: 0,
      selectedButton: 'biRectangle',
      selectedSubButton: 'luAlignLeft',
      textAlignment: 'left' as TextAlign,
      background: 'white',
      text: 'Add Note',
      type: type,
      link: link || 'link',
      layoutImage: layoutImage || '',
    };

    setLayout((prevLayout) => [...prevLayout, newItem]);
  };
  const handleDeleteItem = (itemId: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== itemId));
  };

  const handleChangeLayoutImage = (itemId: string, newLayoutImage: string) => {
    console.log('handleChangeLayoutImage called with itemId:', itemId);
    console.log('newLayoutImage:', newLayoutImage);
    setLayout((prevLayout) =>
      prevLayout.map((item) =>
        item.i === itemId ? { ...item, layoutImage: newLayoutImage } : item
      )
    );
  };

  const handleSizeChange = (
    itemId: string,
    newWidth: number,
    newHeight: number,
    buttonId: string
  ) => {
    const updatedLayout = layout.map((item) => {
      if (item.i === itemId) {
        return { ...item, w: newWidth, h: newHeight, selectedButton: buttonId };
      }
      return item;
    });

    setLayout(updatedLayout);
  };

  const handleAlignmentChange = (itemId: string, buttonId: string) => {
    let alignMent = '';

    if (buttonId === 'luAlignCenter') {
      alignMent = 'center';
    } else if (buttonId === 'luAlignRight') {
      alignMent = 'right';
    } else if (buttonId === 'luAlignLeft') {
      alignMent = 'left';
    } else {
      return;
    }
    const updatedLayout = layout.map((item) => {
      if (item.i === itemId) {
        return {
          ...item,
          textAlignment: alignMent as TextAlign,
          selectedSubButton: buttonId,
        };
      }
      return item;
    });

    setLayout(updatedLayout);
  };

  const handleBackgroundChange = (itemId: string) => {
    let color = 'blue';

    const updatedLayout = layout.map((item) => {
      if (item.i === itemId) {
        return {
          ...item,
          background: color,
        };
      }
      return item;
    });

    setLayout(updatedLayout);
  };

  const handleItemHover = (key: string) => {
    if (openSubMenu) {
      return; // Don't update hoveredItem if a submenu is already open
    }
    setHoveredItem(key);
  };

  const handleItemHoverEnd = () => {
    setHoveredItem(null);
  };

  const handleDragStart = (key: string) => {
    setDraggingItem(key);
  };

  const handleDragStop = () => {
    setDraggingItem(null);
  };

  const handleShowSubMenu = (key: string) => {
    if (openSubMenu === key) {
      setOpenSubMenu(null);
      setShowMenu(false);
      handleItemHoverEnd();
    } else {
      setOpenSubMenu(key);
      setShowMenu(true);
      handleItemHover(key);
    }
  };

  const handleContainerMouseLeave = () => {
    if (!openSubMenu) {
      handleItemHoverEnd();
    }
  };

  const handleDrag = useCallback(
    (
      layout: Layout[],
      oldItem: Layout,
      newItem: Layout,
      placeholder: Layout,
      event: MouseEvent | TouchEvent,
      element: HTMLElement
    ) => {
      // Update the layout state with the new item position
      setLayout((prevLayout) => {
        const updatedLayout = prevLayout.map((item) => {
          if (item.i === newItem.i) {
            return {
              ...item,
              x: newItem.x,
              y: newItem.y,
            };
          }
          return item;
        });
        return updatedLayout;
      });
    },
    []
  );

  const buttons = [
    {
      id: 'biRectangle',
      icon: <BiRectangle size={8} />,
      width: 1,
      height: 3,
    },
    {
      id: 'luRectangleHorizontal',
      icon: <LuRectangleHorizontal size={12} />,
      width: 2,
      height: 2,
    },
    {
      id: 'luRectangleVertical',
      icon: <LuRectangleVertical size={12} />,
      width: 1,
      height: 6,
    },
    {
      id: 'biRectangleLarge',
      icon: <BiRectangle size={24} />,
      width: 2,
      height: 6,
    },
  ];

  const handleSave = async (imageUrl: string) => {
    const data = {
      id: id,
      name: name,
      background: background,
      bio: bio,
      avatar: avatar,
      avatarUploaded: avatarUploaded,
      imageColors: imageColors,
      cover: imageUrl,
      layout: layout,
    };
    try {
      await axios.post('/api/user', data);
      console.log('Data sent to the server');
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };

  const handleSaveAndCapture = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setSaveStatus('Saving..');

    try {
      const imageUrl = await CaptureImage(buttonsContainerRef.current!);

      if (imageUrl!) {
        await handleSave(imageUrl);
      } else {
        console.error('Error capturing image: imageUrl is null or undefined');
      }
    } catch (error) {
      console.error('Error capturing image or saving data:', error);
    }

    setSaveStatus('Save');
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      if (darkTheme) {
        body.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
      }
    }
  }, [darkTheme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenLinkModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // console.log(background);
  // console.log(layout);

  return (
    <>
      <div className='flex items-end  justify-end mr-6 mt-2'>
        <button
          className='px-2 py-1 bg-gray-500 rounded-lg text-white'
          onClick={handleToggleTheme}
        >
          {darkTheme ? 'Light' : 'Dark'}
        </button>
      </div>
      <div
        className='mt-6 mx-12 mb-12 flex justify-center'
        ref={buttonsContainerRef}
      >
        <Profile
          name={name}
          setName={setName}
          bio={bio}
          setBio={setBio}
          avatar={avatar}
          setAvatar={setAvatar}
          background={background}
          setBackground={setBackground}
          uploaded={avatarUploaded}
          setUploaded={setAvatarUploaded}
          imageColors={imageColors}
          setImageColors={setImageColors}
        />
        <GridLayout
          className='flex flex-[2_2_0%] w-full -mt-6'
          layout={layout}
          cols={4}
          rowHeight={30}
          width={976}
          margin={[40, 40]}
          onDragStart={(layout, oldItem, newItem) => {
            handleDragStart(newItem.i);
          }}
          onDrag={handleDrag}
          onDragStop={() => {
            handleDragStop();
          }}
          useCSSTransforms={false}
        >
          {layout.map((item) => (
            <div
              key={item.i}
              className={`rounded-3xl cursor-grab relative ${
                draggingItem === item.i ? 'bg-white' : ''
              }`}
              onMouseEnter={() => {
                if (!openSubMenu) {
                  handleItemHover(item.i);
                }
              }}
              onMouseLeave={handleContainerMouseLeave}
            >
              <div className='border-2 rounded-3xl border-gray-300 h-full w-full px-3 py-3'>
                <div className='textarea-container '>
                  {item.type === 'Add Note' && (
                    <TextArea item={item} setLayout={setLayout} />
                  )}
                  {item.type === 'image' && (
                    <ImageLayout
                      layoutImage={item.layoutImage}
                      onChangeLayoutImage={(newLayoutImage) => {
                        console.log(
                          'onChangeLayoutImage called with newLayoutImage:',
                          newLayoutImage
                        );

                        handleChangeLayoutImage(item.i, newLayoutImage);
                      }}
                    />
                  )}
                  {item.type === 'link' && <SocialLink link={item.link} />}
                </div>
                {hoveredItem === item.i && (
                  <>
                    <div className='absolute -top-4 -left-4 cursor-pointer'>
                      <div
                        className={`${
                          darkTheme
                            ? 'bg-black border-none hover:bg-gray-600'
                            : 'bg-white border border-gray-200 hover:bg-gray-200'
                        }  w-[36px] h-[36px] rounded-[50%] flex items-center justify-center`}
                      >
                        <button onClick={() => handleDeleteItem(item.i)}>
                          <AiOutlineDelete className='text-[18px]' />
                        </button>
                      </div>
                    </div>

                    <div className='absolute -bottom-8 cursor-default left-0 w-full flex items-center justify-center'>
                      <div className='flex px-4 items-center justify-center w-fit bg-black py-2 gap-1 rounded-lg '>
                        {buttons.map((button) => (
                          <div
                            key={button.id}
                            className={`bg-${
                              item.selectedButton === button.id
                                ? 'white'
                                : 'black'
                            } text-${
                              item.selectedButton === button.id
                                ? 'black'
                                : 'white'
                            }   cursor-pointer  w-[24px] h-[24px] flex items-center justify-center rounded-sm`}
                            onClick={() =>
                              handleSizeChange(
                                item.i,
                                button.width,
                                button.height,
                                button.id
                              )
                            }
                          >
                            {button.icon}
                          </div>
                        ))}
                        {item.type === 'Add Note' && (
                          <>
                            <span className='h-3 bg-gray-600 w-[1px] ml-1'></span>

                            <div className='text-white  w-[24px] h-[24px] items-center flex justify-center rounded-sm relative'>
                              <button onClick={() => handleShowSubMenu(item.i)}>
                                <BsThreeDots size={18} />
                              </button>
                            </div>
                            {showMenu && (
                              <Menu
                                key={item.i}
                                item={item}
                                handleAlignmentChange={handleAlignmentChange}
                                handleBackgroundChange={handleBackgroundChange}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>
      <div className='w-full gap-5 flex fixed bottom-4 left-6 right-0 mt-2'>
        <button
          className='bg-gray-600 text-white rounded-lg px-2 py-1 '
          onClick={() => signOut()}
        >
          Logout
        </button>

        <button
          className='bg-white text-black border border-black rounded-lg px-2 py-1 '
          onClick={() => handleAddItem('Add Note', '')}
        >
          Add Text
        </button>
        <button
          ref={buttonRef}
          className='bg-black text-white rounded-lg px-2 py-1 relative'
          onClick={() => setOpenLinkModal(!openLinkModal)}
        >
          Add Link
          {openLinkModal && <LinkModal handleAddItem={handleAddItem} />}
        </button>
        <button
          className='bg-blue-800 text-white rounded-lg px-2 py-1 relative'
          onClick={() => handleAddItem('image', '')}
        >
          Add Image
        </button>

        <button
          className='bg-green-400 text-white rounded-lg px-2 py-1 '
          onClick={handleSaveAndCapture}
        >
          {saveStatus}
        </button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/user/${id}`);
  const data = await res.json();

  return { props: { data } };
};

export default User;
