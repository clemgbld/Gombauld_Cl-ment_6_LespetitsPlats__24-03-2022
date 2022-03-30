import chooseArrayToFilter from "../helpers/chooseArrayToFilter.js";
import { checkTags } from "../helpers/checkTags.js";

class Filter {
  static filter(params) {
    const {
      searchTerm,
      data,
      results,
      isAddingChars,
      ingredientsFiltered,
      appliancesFiltered,
      ustentilsFiltered,
      isNotTags,
    } = params;

    const recipes = chooseArrayToFilter(data, results, isAddingChars);

    return recipes.filter((recipe) => {
      if (recipe.description.toLowerCase().includes(searchTerm)) {
        if (isNotTags) {
          return true;
        }
        const isTagsValid = checkTags(
          recipe,
          ingredientsFiltered,
          appliancesFiltered,
          ustentilsFiltered
        );
        if (isTagsValid) return true;
        return false;
      }
      if (recipe.name.toLowerCase().includes(searchTerm)) {
        if (isNotTags) {
          return true;
        }
        const isTagsValid = checkTags(
          recipe,
          ingredientsFiltered,
          appliancesFiltered,
          ustentilsFiltered
        );
        if (isTagsValid) return true;
        return false;
      }

      if (isNotTags) {
        if (
          recipe.ingredients.find((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchTerm)
          )
        ) {
          return true;
        }
        return false;
      }

      if (!isNotTags) {
        if (
          !recipe.ingredients.find((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchTerm)
          )
        ) {
          return false;
        }
      }

      const isTagsValid = checkTags(
        recipe,
        ingredientsFiltered,
        appliancesFiltered,
        ustentilsFiltered
      );
      if (isTagsValid) return true;
      return false;
    });
  }
}

export default Filter;
