import { recipes } from "./data/recipes.js";

import Recipe from "./models/Recipe.js";

import { BLUE, GREEN, RED } from "./types/colorTypes.js";

import Select from "./templates/select.js";

class App {
  constructor() {
    this.Recipes = [];
    this.AllIngredients = [];
    this.AllAppliance = [];
    this.AllUstensils = [];
  }

  getAllIngredients() {
    this.AllIngredients = [
      ...new Set(
        this.Recipes.map((recipe) => recipe.ingredients)
          .flat()
          .map((ingredient) => ingredient.ingredient)
          .flat()
      ),
    ];
  }

  getAllAppliance() {
    this.AllAppliance = [
      ...new Set(this.Recipes.map((Recipe) => Recipe.appliance)),
    ];
  }

  getAllUstensils() {
    this.AllUstensils = [
      ...new Set(this.Recipes.map((Recipe) => Recipe.ustensils).flat()),
    ];
  }

  async fetchData() {
    recipes.forEach((recipe) => {
      this.Recipes.push(new Recipe(recipe));
    });

    this.getAllIngredients();
    this.getAllAppliance();
    this.getAllUstensils();

    return new Promise((resolve) => resolve("sucess"));
  }

  async init() {
    await this.fetchData();
    const IngredientsSelect = new Select(this.AllIngredients, BLUE);
    const DevicesSelect = new Select(this.AllAppliance, GREEN);
    const ToolsSelect = new Select(this.AllUstensils, RED);
  }
}

const app = new App();

app.init();
