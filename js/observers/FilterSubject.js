import Subject from "./Subject.js";

class FilterSubject extends Subject {
  constructor() {
    super();
  }

  fire(action) {
    this._observers.forEach((observer) => observer.filterRecipes(action));
  }
}

export default FilterSubject;
