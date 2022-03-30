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

    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (recipe.description.toLowerCase().includes(searchTerm)) {
        if (isNotTags) {
          filteredRecipes.push(recipe);
          continue;
        }
        const isTagsValid = checkTags(
          recipe,
          ingredientsFiltered,
          appliancesFiltered,
          ustentilsFiltered
        );
        if (isTagsValid) {
          filteredRecipes.push(recipe);
        }
        continue;
      } else if (recipe.name.toLowerCase().includes(searchTerm)) {
        if (isNotTags) {
          filteredRecipes.push(recipe);
          continue;
        }
        const isTagsValid = checkTags(
          recipe,
          ingredientsFiltered,
          appliancesFiltered,
          ustentilsFiltered
        );

        if (isTagsValid) {
          filteredRecipes.push(recipe);
        }
        continue;
      } else {
        let counter = 0;

        while (counter < recipe.ingredients.length) {
          const ingredient = recipe.ingredients[counter].ingredient;

          if (ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
            if (isNotTags) {
              filteredRecipes.push(recipe);
              break;
            }
            const isTagsValid = checkTags(
              recipe,
              ingredientsFiltered,
              appliancesFiltered,
              ustentilsFiltered
            );
            if (isTagsValid) {
              filteredRecipes.push(recipe);
            }
            break;
          }
          counter++;
        }
      }
    }

    return filteredRecipes;
  }
}

export default Filter;
