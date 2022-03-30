export const getIngredientTags = (recipes) => {
  return [
    ...new Set(
      recipes
        .map((recipe) => recipe.ingredients)
        .flat()
        .map((ingredient) => ingredient.ingredient)
        .flat()
    ),
  ];
};

export const getApplianceTags = (recipes) => {
  return [...new Set(recipes.map((Recipe) => Recipe.appliance))];
};

export const getUstensilsTags = (recipes) => {
  return [...new Set(recipes.map((Recipe) => Recipe.ustensils).flat())];
};
