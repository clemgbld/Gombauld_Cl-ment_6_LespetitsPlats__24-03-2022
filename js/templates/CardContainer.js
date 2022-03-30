class CardContainer {
  constructor() {
    this.$container = document.querySelector(".recipes");
  }

  clearContainer() {
    this.$container.innerHTML = "";
  }

  noResults() {
    this.$container.innerHTML =
      '<p class="recipes__no-results">Aucune recette ne correspond à vos critères de recherche. Vous pouvez chercher « tarte aux pommes », « poisson », etc...</p>';
  }
}

export default CardContainer;
