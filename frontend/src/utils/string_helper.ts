export const shortenString = (str: string, startCount = 8, endCount = 5) =>
  str.slice(0, startCount) + "..." + str.slice(-endCount);
export const shortenAddress = (address: string) => shortenString(address, 8, 5);
