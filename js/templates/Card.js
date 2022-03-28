class Card {
  constructor(recipesData) {
    this.$container = document.querySelector(".recipes");
    this.name = recipesData.name;
    this.servings = recipesData.servings;
    this.ingredients = recipesData.ingredients;
    this.time = recipesData.time;
    this.description = recipesData.description;
    this.appliance = recipesData.appliance;
    this.ustensils = recipesData.ustensils;
  }

  createCard() {
    const ingredients = this.ingredients.map((ingredient) => {
      `<li></li>`;
    });
  }
}

export default Card;
