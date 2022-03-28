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

    this.init();
  }

  createCard() {
    const ingredients = this.ingredients
      .map((ingredient) => {
        return `<li class="recipes__ingredient">
      <strong>${ingredient.ingredient}:</strong>
      ${ingredient.quantity ? ingredient.quantity : 1}${
          ingredient.unit ? ` ${ingredient.unit}` : ""
        }
      </li>`;
      })
      .join("");

    const limit = 200;

    const shortDescription =
      this.description.length > limit
        ? `${this.description.slice(0, limit - 1)}...`
        : this.description;

    const card = `<figure class="recipes__card">
    <div class="recipes__item"></div>
    <figcaption class="recipes__content">
      <div class="recipes__info">
        <h4 class="recipes__title">${this.name}</h4>
        <div class="recipes__clock">
          <span class="recipes__icon">
            <ion-icon name="time-outline"></ion-icon>
          </span>

          <p class="recipes__time">${this.time} min</p>
        </div>
      </div>
      <div class="recipes__main">
        <ul class="recipes__ingredients">
         ${ingredients}
        </ul>
        <p class="recipes__description">
         ${shortDescription}
        </p>
      </div>
    </figcaption>
  </figure>`;

    this.$container.innerHTML += card;
  }

  init() {
    this.createCard();
  }
}

export default Card;
