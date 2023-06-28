import React, { useState } from 'react';

interface LinkModalProps {
  handleAddItem: (type: string, link: string) => void;
}

const LinkModal = ({ handleAddItem }: LinkModalProps) => {
  const [link, setLink] = useState('');

  const handlePaste = () => {
    const linkTypeRegex: { [key: string]: RegExp } = {
      instagram: /instagram\.com/,
      linkedin: /linkedin\.com/,
      facebook: /facebook\.com/,
      twitter: /twitter\.com/,
      figma: /figma\.com/,
      behance: /behance\.com/,
      spotify: /spotify\.com/,
      twitch: /twitch\.tv/,
      youtube: /youtube\.com/,
      github: /github\.com/,
      telegram: /telegram\.me/,
    };

    let type = 'link';
    let parsedLink = '';

    for (const linkType in linkTypeRegex) {
      const regex = linkTypeRegex[linkType as keyof typeof linkTypeRegex];
      if (regex.test(link)) {
        parsedLink = link;
        break;
      }
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
