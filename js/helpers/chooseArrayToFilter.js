const chooseArrayToFilter = (data, results, isAddingChars) => {
  if (!isAddingChars) {
    return data;
  }

  if (data.length === results.length) {
    return data;
  }

  return results;
};

export default chooseArrayToFilter;
