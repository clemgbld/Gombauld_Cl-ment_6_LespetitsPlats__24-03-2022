class Search {
  constructor(FilterSubject) {
    this.$form = document.querySelector(".search__form");
    this.$input = document.querySelector(".search__input");

    this.FilterSubject = FilterSubject;

    this.init();
  }

  init() {
    const filterRecipes = (e) => {
      this.FilterSubject.fire(e.target.value);
    };

    this.$form.addEventListener("submit", (e) => e.preventDefault());
    this.$input.addEventListener("input", (e) => filterRecipes(e));
  }
}

export default Search;
