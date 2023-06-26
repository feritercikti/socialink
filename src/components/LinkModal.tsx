import React, { useState } from 'react';

interface LinkModalProps {
  handleAddItem: (type: string, link: string) => void;
}

const LinkModal = ({ handleAddItem }: LinkModalProps) => {
  const [link, setLink] = useState('');

  const handlePaste = () => {
    const instagramRegex = /instagram\.com\/(\w+)/;
    const linkedinRegex = /linkedin\.com\/(\w+)/;
    const facebookRegex = /facebook\.com\/(\w+)/;
    const twitterRegex = /twitter\.com\/(\w+|\W+)/;
    const figmaRegex = /figma\.com\/(.+)/;
    const behanceRegex = /behance\.com\/(.+)/;

    let type = 'link';
    let parsedLink = '';

    if (instagramRegex.test(link)) {
      parsedLink = link;
    } else if (facebookRegex.test(link)) {
      parsedLink = link;
    } else if (linkedinRegex.test(link)) {
      parsedLink = link;
    } else if (twitterRegex.test(link)) {
      parsedLink = link;
    } else if (figmaRegex.test(link)) {
      parsedLink = link;
    } else if (behanceRegex.test(link)) {
      parsedLink = link;
    }

    handleAddItem(type, parsedLink);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handlePaste();
  };

  console.log(link);

  return (
    <div
      className='absolute -top-7 left-0 mb-5 flex gap-2'
      onClick={(e) => e.stopPropagation()}
    >
      <input
        placeholder='Paste your link here'
        className='rounded-lg px-2 text-black border border-black'
        value={link}
        onChange={handleChange}
        required
        onClick={handleInputClick}
      />
      <button
        className='bg-black text-white rounded-lg px-2'
        onClick={handleButtonClick}
      >
        Paste
      </button>
    </div>
  );
};

export default LinkModal;
