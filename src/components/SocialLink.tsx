import Link from 'next/link';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

interface SocialLinkProps {
  link?: string;
}

const SocialLink = ({ link }: SocialLinkProps) => {
  const getUsernameFromLink = () => {
    const usernameRegex = /\/([^/]+)\/?$/;
    const match = link!.match(usernameRegex);
    return match ? match[1] : '';
  };

  const headerText = getUsernameFromLink();

  const getNetworkName = () => {
    const networkRegex = /(https?:\/\/)?(www\.)?([^/]+)\//;
    const match = link!.match(networkRegex);
    const domain = match ? match[3] : '';
    const networkName = domain.replace(/\.(com|co\.uk|io)$/, '');
    return networkName;
  };

  const networkName = getNetworkName();
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
