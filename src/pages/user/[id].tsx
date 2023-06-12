import React, { useEffect } from 'react';
import { useState, useCallback, useContext } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
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
import { ThemeContext } from '@/ThemeContext';

type TextAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent';

const User = () => {
  const [layout, setLayout] = useState([
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
    },
  ]);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const { darkTheme, toggleDarkTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    toggleDarkTheme();
  };

  const handleAddItem = () => {
    const newItem = {
      i: `item_${layout.length}`,
      x: 0,
      y: Infinity,
      w: 1,
      h: 3,
      minWidth: 0,
      selectedButton: 'biRectangle',
      selectedSubButton: 'luAlignLeft',
      textAlignment: 'left' as TextAlign,
      background: 'white',
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
      id: 'luAlignVerticalJustifyStart',
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

  console.log(layout);

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
      <div className='mt-6 mx-12 flex justify-center'>
        <Profile />
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
              <div className='border rounded-3xl border-gray-200 h-full w-full px-3 py-3  '>
                <div className='textarea-container '>
                  <textarea
                    placeholder='Add Note'
                    className='rounded-2xl px-2 py-2 outline-none hover:bg-gray-100 ease-in duration-300 hover:text-black h-full w-full overflow-hidden resize-none text-xl'
                    style={{
                      backgroundColor: item.background,
                      textAlign: item.textAlignment,
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </div>
                {hoveredItem === item.i && (
                  <>
                    <div className='absolute -top-4 -left-4 cursor-pointer'>
                      <div
                        className={`bg-${
                          darkTheme ? 'black' : 'white'
                        } border ${
                          darkTheme ? 'border-none' : 'border-gray-200'
                        } w-[36px] h-[36px] rounded-[50%] flex items-center justify-center`}
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
                                className={`bg-${
                                  item.selectedSubButton === menuItem.id
                                    ? 'white'
                                    : 'black'
                                } text-${
                                  item.selectedSubButton === menuItem.id
                                    ? 'black'
                                    : 'white'
                                } 
                              cursor-pointer w-[24px] h-[24px] flex items-center justify-center rounded-sm`}
                              >
                                <button
                                  onClick={() =>
                                    handleAlignmentChange(item.i, menuItem.id)
                                  }
                                >
                                  {menuItem.icon}
                                </button>
                              </div>
                            ))}
                            <span className='h-3 bg-gray-600 w-[1px] '></span>
                            <div
                              className='h-4 w-4 rounded-[50%] bg-white cursor-pointer'
                              onClick={() => handleBackgroundChange(item.i)}
                            ></div>
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
      <div className='w-full items-center justify-center flex fixed bottom-4 left-0 right-0'>
        <button
          className='bg-green-400 text-white rounded-lg px-2 py-1 '
          onClick={handleAddItem}
        >
          Add birectangle
        </button>
        <button
          className='bg-green-400 text-white rounded-lg px-2 py-1 '
          onClick={handleAddItem}
        >
          Add Image
        </button>
        <button
          className='bg-black-400 text-white rounded-lg px-2 py-1 '
          onClick={handleAddItem}
        >
          Add Text
        </button>
      </div>
    </>
  );
};

export default User;
