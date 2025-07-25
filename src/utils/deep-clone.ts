export const deepClone = (obj: unknown) => {
  return JSON.parse(JSON.stringify(obj));
};
