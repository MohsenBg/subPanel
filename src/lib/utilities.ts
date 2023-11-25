export const convertTextToFloat = (value: string): number => {
  const searchResult = value.match(/[+-]?\d+(\.\d+)?/g);
  if (!searchResult) return 0.0;
  return parseFloat(searchResult[0]);
};
