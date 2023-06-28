export const getUsernameFromLink = (link?: string) => {
  const usernameRegex = /\/([^/]+)\/?$/;
  const match = link!.match(usernameRegex);
  return match ? match[1] : '';
};

export const getNetworkName = (link?: string) => {
  const networkRegex = /(https?:\/\/)?(www\.)?([^/]+)\//;
  const match = link!.match(networkRegex);
  const domain = match ? match[3] : '';
  const networkName = domain.replace(/\.(com|co\.uk|io|me|tv)$/, '');
  return networkName;
};
