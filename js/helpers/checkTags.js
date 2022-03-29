export function checkTags(
  recipe,
  ingredientsFiltered,
  appliancesFiltered,
  ustentilsFiltered
) {
  if (ingredientsFiltered.length > 0) {
    ingredientsFiltered.forEach((ingredient) => {
      const isValid = recipe.ingredients.some(
        (item) => item.ingredient.toLowerCase() === ingredient.toLowerCase()
      );
      if (!isValid) return false;
    });
  }

  if (appliancesFiltered.length > 0) {
    appliancesFiltered.forEach((appliance) => {
      if (appliance.lowerCase() !== recipe.appliance) {
        return false;
      }
    });
  }

  if (ustentilsFiltered.length > 0) {
    ustentilsFiltered.forEach((ustensil) => {
      const isValid = recipe.ustensils.some(
        (item) => item.toLowerCase() === ustensil.toLowerCase
      );
      if (!isValid) return false;
    });
  }

  return true;
}
