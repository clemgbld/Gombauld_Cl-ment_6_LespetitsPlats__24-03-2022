import { checkTags } from "../helpers/checkTags.js";
import chooseArrayToFilterTags from "../helpers/chooseArrayToFilterTags.js";

class FilterByTags {
  static filter(params) {
    const {
      data,
      results,
      ingredientsFiltered,
      appliancesFiltered,
      ustentilsFiltered,
      operation,
    } = params;

    const recipes = chooseArrayToFilterTags(data, results, operation);

    return recipes.filter((recipe) =>
      checkTags(
        recipe,
        ingredientsFiltered,
        appliancesFiltered,
        ustentilsFiltered
      )
    );
  }
}

export default FilterByTags;
