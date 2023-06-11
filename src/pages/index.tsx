import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import GridLayout from 'react-grid-layout';
import Profile from '@/components/Profile';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiRectangle } from 'react-icons/bi';
import {
  LuRectangleHorizontal,
  LuRectangleVertical,
  LuAlignLeft,
  LuAlignRight,
  LuAlignCenter,
  LuAlignVerticalJustifyStart,
  LuAlignVerticalJustifyCenter,
  LuAlignVerticalJustifyEnd,
} from 'react-icons/lu';
import { BsThreeDots } from 'react-icons/bs';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [layout, setLayout] = useState([
    { i: 'a', x: 0, y: 0, w: 0.8, h: 3, selectedButton: 'biRectangle' },
    {
      i: 'b',
      x: 1,
      y: 0,
      w: 1.6,
      h: 2,
      selectedButton: 'luRectangleHorizontal',
    },
    { i: 'c', x: 4, y: 0, w: 0.8, h: 6, selectedButton: 'luRectangleVertical' },
    { i: 'd', x: 4, y: 0, w: 1.6, h: 6, selectedButton: 'biRectangleLarge' },
  ]);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string>('');

  const handleAddItem = () => {
    const newItem = {
      i: `item_${layout.length}`,
      x: 0,
      y: Infinity, // Place the new item at the bottom
      w: 0.8,
      h: 3,
      selectedButton: 'biRectangle',
    };

    setLayout((prevLayout) => [...prevLayout, newItem]);
  };
  const handleDeleteItem = (itemId: string) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== itemId));
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

  const buttons = [
    {
      id: 'biRectangle',
      icon: <BiRectangle size={8} />,
      width: 0.8,
      height: 3,
    },
    {
      id: 'luRectangleHorizontal',
      icon: <LuRectangleHorizontal size={12} />,
      width: 1.6,
      height: 2,
    },
    {
      id: 'luRectangleVertical',
      icon: <LuRectangleVertical size={12} />,
      width: 0.8,
      height: 6,
    },
    {
      id: 'biRectangleLarge',
      icon: <BiRectangle className='text-[24px]' />,
      width: 1.6,
      height: 6,
    },
  ];

  const menuItems = [
    {
      id: 'luAlignLeft',
      icon: <LuAlignLeft size={18} />,
    },
    {
      id: 'luAlignCenter',
      icon: <LuAlignCenter size={18} />,
    },
    {
      id: 'luAlignRight',
      icon: <LuAlignRight size={18} />,
    },
    {
      id: 'luAlignVeritcalJustifyStart',
      icon: <LuAlignVerticalJustifyStart size={18} />,
    },
    {
      id: 'luAlignVerticalJustifyCenter',
      icon: <LuAlignVerticalJustifyCenter size={18} />,
    },
    {
      id: 'luAlignVerticalJustifyEnd',
      icon: <LuAlignVerticalJustifyEnd size={18} />,
    },
  ];

  return (
    <>
      <div className='mt-6 mx-12 flex justify-center'>
        <Profile />
        <GridLayout
          className='flex flex-[2_2_0%] w-full mt-0'
          layout={layout}
          cols={4}
          rowHeight={30}
          width={976}
          margin={[20, 40]}
          onDragStart={(layout, oldItem, newItem) => {
            handleDragStart(newItem.i);
          }}
          onDrag={(layout, oldItem, newItem, placeholder, e) => {
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
          }}
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
              <div className='border rounded-3xl border-gray-200 h-full w-full px-3 py-3  '>
                <div className='textarea-container'>
                  <textarea
                    placeholder='Add Note'
                    className='rounded-2xl px-2 py-2 outline-none bg-white hover:bg-gray-100 ease-in duration-300 hover:text-black text-align-top h-full w-full overflow-hidden resize-none text-xl '
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </div>
                {hoveredItem === item.i && (
                  <>
                    <div className='absolute -top-4 -left-4 cursor-pointer'>
                      <div className='bg-white border border-gray-200 w-[36px] h-[36px] rounded-[50%] flex items-center justify-center '>
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
                        <span className='h-3 bg-gray-600 w-[1px] ml-1'></span>
                        <div className='text-white  w-[24px] h-[24px] items-center flex justify-center rounded-sm relative'>
                          <button onClick={() => handleShowSubMenu(item.i)}>
                            <BsThreeDots size={18} />
                          </button>
                        </div>
                        {showMenu && (
                          <div className='items-center justify-center z-[9999] absolute -bottom-9  mt-3 bg-black  rounded-lg  px-2 py-1 flex gap-2'>
                            {menuItems.map((menuItem) => (
                              <div
                                key={menuItem.id}
                                className='
                              bg-black text-white cursor-pointer w-[24px] h-[24px] flex items-center justify-center rounded-sm'
                              >
                                {menuItem.icon}
                              </div>
                            ))}
                            <span className='h-3 bg-gray-600 w-[1px] '></span>
                            <div className='h-4 w-4 rounded-[50%] bg-white cursor-pointer'></div>
                          </div>
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
      <div className='w-full items-center justify-center flex fixed bottom-0 left-0 right-0'>
        <button
          className='bg-green-400 text-white rounded-lg px-2 py-1 '
          onClick={handleAddItem}
        >
          Add birectangle
        </button>
      </div>
    </>
  );
}
