import chooseArrayToFilter from "../helpers/chooseArrayToFilter.js";
import { checkTags } from "../helpers/checkTags.js"

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
    } = params;

    const isNotTags =
      [
        ingredientsFiltered.length,
        appliancesFiltered.length,
        ustentilsFiltered.length,
      ].reduce((acc, cur) => acc + cur, 0) === 0;

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
