// helpers
import {
  getIngredientTags,
  getApplianceTags,
  getUstensilsTags,
} from "./helpers/getTags.js";

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
import {
  UpdateIngredientTagsSubject,
  UpdateApplianceTagsSubject,
  UpdateUstensilTagsSubject,
} from "./observers/UpdateTagsSubject.js";

// algorithm
import Filter from "./Algorithm/Filter.js";
import FilterByTags from "./Algorithm/FilterByTags.js";

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
    this.UpdateIngredientTagsSubject = new UpdateIngredientTagsSubject();
    this.UpdateApplianceTagsSubject = new UpdateApplianceTagsSubject();
    this.UpdateUstensilTagsSubject = new UpdateUstensilTagsSubject();
  }

  updateTagsContainer(recipes) {
    const ingredientsTags = getIngredientTags(recipes);
    this.UpdateIngredientTagsSubject.fire(ingredientsTags);

    const applianceTags = getApplianceTags(recipes);
    this.UpdateApplianceTagsSubject.fire(applianceTags);

    const ustensilsTags = getUstensilsTags(recipes);
    this.UpdateUstensilTagsSubject.fire(ustensilsTags);
  }

  filterRecipes(searchTerm) {
    const LastSearchTerm = this.searchTerm;
    this.searchTerm = searchTerm.toLowerCase();
    const isSearchTermLongerThan3 = this.searchTerm.length >= 3;
    const isAddingChars = searchTerm.length > LastSearchTerm;
    this.CardContainer.clearContainer();

    if (!isSearchTermLongerThan3) {
      this.RecipesFiltered = this.Recipes;
      return this.updateTagsContainer(this.Recipes);
    }

    const params = {
      searchTerm: this.searchTerm,
      data: this.Recipes,
      results: this.RecipesFiltered,
      isAddingChars,
      ingredientsFiltered: this.ingredientsFiltered,
      appliancesFiltered: this.appliancesFiltered,
      ustentilsFiltered: this.ustentilsFiltered,
    };

    this.RecipesFiltered = Filter.filter(params);

    if (this.RecipesFiltered.length === 0) {
      this.CardContainer.noResults();
      return this.updateTagsContainer(this.RecipesFiltered);
    }

    this.RecipesFiltered.forEach((Recipe) => new Card(Recipe));

    this.updateTagsContainer(this.RecipesFiltered);
  }

  filterRecipesByTags(tag, color, operation) {
    if (operation === ADD) {
      if (color === BLUE) {
        this.ingredientsFiltered.push(tag);
      }
      if (color === GREEN) {
        this.appliancesFiltered.push(tag);
      }
      if (color === RED) {
        this.ustentilsFiltered.push(tag);
      }
    }

    if (operation === SUB) {
      if (color === BLUE) {
        this.ingredientsFiltered.filter((tagFiltered) => tag !== tagFiltered);
      }
      if (color === GREEN) {
        this.appliancesFiltered.filter((tagFiltered) => tag !== tagFiltered);
      }

      if (color === RED) {
        this.ustentilsFiltered.filter((tagFiltered) => tag !== tagFiltered);
      }
    }

    const params = {
      data: this.Recipes,
      results: this.RecipesFiltered,
      ingredientsFiltered: this.ingredientsFiltered,
      appliancesFiltered: this.appliancesFiltered,
      ustentilsFiltered: this.ustentilsFiltered,
      operation,
    };
  }

  getAllIngredients(recipes) {
    this.AllIngredients = getIngredientTags(recipes);
  }

  getAllAppliance(recipes) {
    this.AllAppliance = getApplianceTags(recipes);
  }

  getAllUstensils(recipes) {
    this.AllUstensils = getUstensilsTags(recipes);
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
    this.UpdateIngredientTagsSubject.subscribe(IngredientsSelect);
    this.UpdateApplianceTagsSubject.subscribe(DevicesSelect);
    this.UpdateUstensilTagsSubject.subscribe(ToolsSelect);
  }
}

const app = new App();

app.init();
