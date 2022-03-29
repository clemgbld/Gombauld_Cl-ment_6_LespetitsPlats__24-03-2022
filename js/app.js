// data
import { recipes } from "./data/recipes.js";
// models
import Recipe from "./models/Recipe.js";
// types
import { BLUE, GREEN, RED } from "./types/colorTypes.js";
import { ADD, SUB } from "./types/operationsTypes.js";

// templates
import Select from "./templates/select.js";
import CardContainer from "./templates/CardContainer.js";
import Card from "./templates/Card.js";
import Search from "./templates/Search.js";

// Subject
import FilterSubject from "./observers/FilterSubject.js";
import FilterByTagsSubject from "./observers/FilterByTagsSubject.js";
import UpdateTagsSubject from "./observers/UpdateTagsSubject.js";

// algorithm
import Filter from "./Algorithm/Filter.js";

class App {
  constructor() {
    this.Recipes = [];
    this.RecipesFiltered = [];
    this.AllIngredients = [];
    this.ingredientsFiltered = [];
    this.AllAppliance = [];
    this.appliancesFiltered = [];
    this.AllUstensils = [];
    this.ustentilsFiltered = [];
    this.searchTerm = "";

    this.CardContainer = new CardContainer();

    this.FilterSubject = new FilterSubject();
    this.FilterByTagsSubject = new FilterByTagsSubject();
    this.UpdateTagsSubject = new UpdateTagsSubject();

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

  filterRecipesByTags(tag, color, operation) {
    console.log("tag", tag);
    console.log("color", color);
    console.log("operation", operation);
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
    this.FilterByTagsSubject.subscribe(this);

    const IngredientsSelect = new Select(
      this.AllIngredients,
      BLUE,
      this.FilterByTagsSubject
    );
    const DevicesSelect = new Select(
      this.AllAppliance,
      GREEN,
      this.FilterByTagsSubject
    );
    const ToolsSelect = new Select(
      this.AllUstensils,
      RED,
      this.FilterByTagsSubject
    );
    const SearchBar = new Search(this.FilterSubject);

    [IngredientsSelect, DevicesSelect, ToolsSelect].forEach((Select) =>
      this.UpdateTagsSubject.subscribe(Select)
    );
  }
}

const app = new App();

app.init();
