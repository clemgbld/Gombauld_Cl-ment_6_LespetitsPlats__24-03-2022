import Tag from "./Tag.js";
import { ADD } from "../types/operationsTypes.js";

class Select {
  constructor(tags, type, FilterByTagsSubject) {
    this.tags = tags;
    this.tagsFiltered = tags;
    this.type = type;
    this.$wrapper = document.querySelector(`.selects__wrapper--${type}`);
    this.$select = document.querySelector(`.selects__select--${type}`);
    this.$tagsContainer = document.querySelector(`.selects__tags--${type}`);
    this.$btn = this.$wrapper.querySelector(".selects__icon");
    this.$form = this.$wrapper.querySelector(".selects__form");
    this.$title = this.$wrapper.querySelector(".selects__title");
    this.$input = this.$wrapper.querySelector(".selects__search");

    this.FilterByTagsSubject = FilterByTagsSubject;

    this.init();
  }

  resetAllSelects() {
    const wrappers = document.querySelectorAll(".selects__wrapper");
    const tagsContainers = document.querySelectorAll(".selects__tags");
    const buttons = document.querySelectorAll(".selects__icon");
    const titles = document.querySelectorAll(".selects__title");
    const forms = document.querySelectorAll(".selects__form");

    wrappers.forEach((wrapper) => (wrapper.classList = "selects__wrapper"));
    tagsContainers.forEach((tagsContainer) =>
      !tagsContainer.classList.contains("hidden")
        ? tagsContainer.classList.add("hidden")
        : ""
    );
    buttons.forEach((btn) => (btn.classList = "selects__icon"));
    titles.forEach((title) => (title.classList = "selects__title"));
    forms.forEach((form) => (form.classList = "selects__form hidden"));
  }

  resetSelect() {
    this.$wrapper.classList = "selects__wrapper";
    this.$tagsContainer.classList.add("hidden");
    this.$tagsContainer.classList.remove("selects__tags--expended");
    this.$btn.classList.remove("selects__icon--rotate");
    this.$title.classList.remove("hidden");
    this.$form.classList.add("hidden");
  }

  setActive() {
    this.resetAllSelects();

    this.$title.classList.add("hidden");
    this.$form.classList.remove("hidden");
    this.$wrapper.classList.add("selects__wrapper--active");
    this.$tagsContainer.classList.remove("hidden");
    this.$btn.classList.add("selects__icon--rotate");
  }

  toggleExpend() {
    if (!this.$wrapper.classList.contains("selects__wrapper--expended")) {
      this.resetAllSelects();

      this.$title.classList.add("hidden");
      this.$form.classList.remove("hidden");

      if (!this.$btn.classList.contains("selects__icon--rotate")) {
        this.$btn.classList.add("selects__icon--rotate");
      }

      if (!this.$wrapper.classList.contains("selects__wrapper--active")) {
        this.$wrapper.classList.add("selects__wrapper--active");
      }
      this.$wrapper.classList.add("selects__wrapper--expended");

      this.$tagsContainer.classList.remove("hidden");
      return this.$tagsContainer.classList.add("selects__tags--expended");
    }

    this.$wrapper.classList.remove("selects__wrapper--expended");
    this.$tagsContainer.classList.remove("selects__tags--expended");
  }

  createTag(tag) {
    this.FilterByTagsSubject.fire(tag.id, this.type, ADD);
    new Tag(tag.id, this.type, this.FilterByTagsSubject);
  }

  fillTagsContainer(tags) {
    this.tags = tags;

    this.fillTagsWithInput(tags);
  }

  fillTagsWithInput(tags) {
    const tagsList = tags.map(
      (word) =>
        `<li class="selects__tag selects__tag--${this.type}" id="${word}">${word}</li>`
    );

    this.$tagsContainer.innerHTML = "";

    tagsList.forEach((tag) => (this.$tagsContainer.innerHTML += tag));

    const createTag = (e) => {
      e.stopPropagation();
      this.createTag(e.target);
    };

    document
      .querySelectorAll(`.selects__tag--${this.type}`)
      .forEach((tag) => tag.addEventListener("click", (e) => createTag(e)));
  }

  filterTags(e) {
    const tags = this.tags.filter((tag) =>
      tag.toLowerCase().includes(e.target.value.toLowerCase())
    );

    const fillTagsContainer = () => {
      this.fillTagsWithInput(tags);
    };

    fillTagsContainer();
  }

  init() {
    this.fillTagsContainer(this.tags);

    const toggleExpend = (e) => {
      e.stopPropagation();

      this.toggleExpend();
    };

    const setActive = (e) => {
      e.stopPropagation();
      this.setActive();
    };

    const resetSelect = (e) => {
      if ([this.$input, this.$select, this.$tagsContainer].includes(e.target))
        return;

      this.resetSelect();
    };

    const filterTags = (e) => {
      this.filterTags(e);
    };

    this.$btn.addEventListener("click", toggleExpend);
    this.$title.addEventListener("click", setActive);
    document.addEventListener("click", resetSelect);
    this.$input.addEventListener("input", (e) => filterTags(e));
    this.$form.addEventListener("submit", (e) => e.preventDefault());
  }
}

export default Select;
