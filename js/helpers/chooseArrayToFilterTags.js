import { SUB } from "../types/operationsTypes.js";

const chooseArrayToFilterTags = (data, results, operation) => {
  if (operation === SUB) {
    return data;
  }

  if (data.length === results.length) {
    return data;
  }

  return results;
};

export default chooseArrayToFilterTags;
