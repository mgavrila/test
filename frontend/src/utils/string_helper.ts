export const shortenString = (str: string, startCount = 8, endCount = 5) =>
  str.slice(0, startCount) + "..." + str.slice(-endCount);
export const shortenAddress = (address: string) => shortenString(address, 8, 5);

export const toSmallestUnit = (num: string, decimals = 0) => {
  // Assume num is a positive number and decimals is > 0
  const indexOfDot = num.indexOf(".");
  if (indexOfDot === -1) {
    return num + "0".repeat(decimals);
  }
  const decimalPlaces = num.length - indexOfDot - 1;
  return (
    num.substring(indexOfDot + 1) + "0".repeat(decimals - decimalPlaces)
  ).replace(/^0+/g, "");
};

export const roundDownTo6Decimals = (balance: string) =>
  Math.floor(+balance * 1000000) / 1000000 + "";
