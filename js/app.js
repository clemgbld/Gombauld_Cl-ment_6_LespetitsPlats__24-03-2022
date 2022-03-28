// data
import { recipes } from "./data/recipes.js";
// models
import Recipe from "./models/Recipe.js";
// types
import { BLUE, GREEN, RED } from "./types/colorTypes.js";

// templates
import Select from "./templates/select.js";
import CardContainer from "./templates/CardContainer.js";
import Card from "./templates/Card.js";
import Search from "./templates/Search.js";

// Subject
import FilterSubject from "./observers/FilterSubject.js";

// algorithm
import Filter from "./Algorithm/Filter.js";

class App {
  constructor() {
    this.Recipes = [];
    this.RecipesFiltered = [];
    this.AllIngredients = [];
    this.AllAppliance = [];
    this.AllUstensils = [];
    this.searchTerm = "";

    this.CardContainer = new CardContainer();

    this.FilterSubject = new FilterSubject();

    this.Filter = new Filter();
  }

  filterRecipes(searchTerm) {
    const LastSearchTerm = this.searchTerm;
    console.log(searchTerm);
    this.searchTerm = searchTerm;
    const isSearchTermLongerThan3 = this.searchTerm.length >= 3;
    const isAddingChars = searchTerm.length > LastSearchTerm;
    this.CardContainer.clearContainer();

    if (!isSearchTermLongerThan3) return;
  }

  getAllIngredients(recipes) {
    this.AllIngredients = [
      ...new Set(
        recipes
          .map((recipe) => recipe.ingredients)
          .flat()
          .map((ingredient) => ingredient.ingredient)
          .flat()
      ),
    ];
  }

  getAllAppliance(recipes) {
    this.AllAppliance = [...new Set(recipes.map((Recipe) => Recipe.appliance))];
  }

  getAllUstensils(recipes) {
    this.AllUstensils = [
      ...new Set(recipes.map((Recipe) => Recipe.ustensils).flat()),
    ];
  }

  async fetchData() {
    recipes.forEach((recipe) => {
      this.Recipes.push(new Recipe(recipe));
    });

    this.RecipesFiltered = this.Recipes;

    this.getAllIngredients(this.Recipes);
    this.getAllAppliance(this.Recipes);
    this.getAllUstensils(this.Recipes);

    return new Promise((resolve) => resolve("sucess"));
  }

  async init() {
    await this.fetchData();

    this.FilterSubject.subscribe(this);

    const IngredientsSelect = new Select(this.AllIngredients, BLUE);
    const DevicesSelect = new Select(this.AllAppliance, GREEN);
    const ToolsSelect = new Select(this.AllUstensils, RED);
    const SearchBar = new Search(this.FilterSubject);
  }
}

const app = new App();

app.init();
