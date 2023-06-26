import React from 'react';
import {
  LuAlignLeft,
  LuAlignRight,
  LuAlignCenter,
  LuAlignVerticalJustifyStart,
  LuAlignVerticalJustifyCenter,
  LuAlignVerticalJustifyEnd,
} from 'react-icons/lu';

type TextAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent';

interface MenuItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minWidth: number;
  selectedButton: string;
  selectedSubButton: string;
  textAlignment: TextAlign;
  background: string;
}

interface MenuProps {
  item: MenuItem;
  handleAlignmentChange: (itemId: string, buttonId: string) => void;
  handleBackgroundChange: (itemId: string) => void;
}

const Menu = ({
  item,
  handleAlignmentChange,
  handleBackgroundChange,
}: MenuProps) => {
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
  ];

  return (
    <div className='items-center justify-center z-[9999] absolute -bottom-9  mt-3 bg-black  rounded-lg  px-2 py-1 flex gap-2'>
      {menuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          className={`bg-${
            item.selectedSubButton === menuItem.id ? 'white' : 'black'
          } text-${item.selectedSubButton === menuItem.id ? 'black' : 'white'} 
                              cursor-pointer w-[24px] h-[24px] flex items-center justify-center rounded-sm`}
        >
          <button onClick={() => handleAlignmentChange(item.i, menuItem.id)}>
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
  );
};

export default Menu;
