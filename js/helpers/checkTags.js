export function checkTags(
  recipe,
  ingredientsFiltered,
  appliancesFiltered,
  ustentilsFiltered
) {
  let isCorrect = true;

  if (ingredientsFiltered.length > 0) {
    ingredientsFiltered.forEach((ingredient) => {
      const isValid = recipe.ingredients.some(
        (item) => item.ingredient.toLowerCase() === ingredient.toLowerCase()
      );

      if (!isValid) return (isCorrect = false);
    });
  }

  if (appliancesFiltered.length > 0) {
    appliancesFiltered.forEach((appliance) => {
      if (appliance.toLowerCase() !== recipe.appliance.toLowerCase()) {
        return (isCorrect = false);
      }
    });
  }

  if (ustentilsFiltered.length > 0) {
    ustentilsFiltered.forEach((ustensil) => {
      const isValid = recipe.ustensils.some(
        (item) => item.toLowerCase() === ustensil.toLowerCase()
      );
      if (!isValid) return (isCorrect = false);
    });
  }

  return isCorrect;
}
