import { recipes } from "./data/recipes.js";
import Recipe from "./models/Recipe.js";

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
    console.log("Recipes", this.Recipes);
    console.log("All ingredients", this.AllIngredients);
    console.log("All appliance", this.AllAppliance);
    console.log("All ustensils", this.AllUstensils);
  }
}

const app = new App();

app.init();
