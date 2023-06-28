import Link from 'next/link';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { getUsernameFromLink, getNetworkName } from './../utils/linkUtils';

interface SocialLinkProps {
  link?: string;
}

const SocialLink = ({ link }: SocialLinkProps) => {
  const headerText = getUsernameFromLink(link);

  const networkName = getNetworkName(link);
  const updatedLink = link!.replace('http://localhost:3000/user', '');

  return (
    <div className='flex items-center justify-center h-full w-full flex-col '>
      <SocialIcon
        network={networkName}
        url={`//${updatedLink}`}
        target='_blank'
      />
      <h2>{headerText}</h2>
    </div>
  );
};

export default SocialLink;
