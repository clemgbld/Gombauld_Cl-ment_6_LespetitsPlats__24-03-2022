class Recipe {
  constructor(recipeData) {
    this._id = recipeData.id;
    this._name = recipeData.name;
    this._servings = recipeData.servings;
    this._ingredients = recipeData.ingredients;
    this._time = recipeData.time;
    this._description = recipeData.description;
    this._appliance = recipeData.appliance;
    this._ustensils = recipeData.ustensils;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
  get servings() {
    return this._servings;
  }
  get ingredients() {
    const ingredients = this._ingredients.map((ingredient) => {
      return {
        ingredient: ingredient.ingredient,
        ...(ingredient.quantity && {
          quantity: ingredient.quantity,
        }),
        ...(ingredient.unit && {
          unit: ingredient.unit.includes("grammes")
            ? ingredient.unit.replace("grammes", "g")
            : ingredient.unit,
        }),
      };
    });

    return ingredients;
  }
  get time() {
    return this._time;
  }
  get description() {
    return this._description;
  }
  get appliance() {
    return this._appliance;
  }
  get ustensils() {
    return this._ustensils;
  }
}

export default Recipe;
