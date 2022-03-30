export const removeDuplicate = (arr) => {
  return arr.filter(
    (item, _, arr) => arr.indexOf(item) === arr.lastIndexOf(item)
  );
};
