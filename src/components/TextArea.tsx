import { Layout } from '@/types/types';
import React from 'react';

interface Props {
  item: Layout;
  setLayout: React.Dispatch<React.SetStateAction<Layout[]>>;
}

const TextArea = ({ item, setLayout }: Props) => {
  return (
    <div className='h-full'>
      <textarea
        value={item.text}
        onChange={(e) =>
          setLayout((prevLayout) =>
            prevLayout.map((prevItem) =>
              prevItem.i === item.i
                ? { ...prevItem, text: e.target.value }
                : prevItem
            )
          )
        }
        className='px-2 rounded-2xl  outline-none hover:bg-gray-200 text-black h-full w-full overflow-hidden resize-none text-xl'
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
  );
};

export default TextArea;
