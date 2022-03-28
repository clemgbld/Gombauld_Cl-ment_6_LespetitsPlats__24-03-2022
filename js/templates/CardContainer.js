class CardContainer {
  constructor() {
    this.$container = document.querySelector(".recipes");
  }

  clearContainer() {
    this.$container.innerHTML = "";
  }
}

export default CardContainer;
