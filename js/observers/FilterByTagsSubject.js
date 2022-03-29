import Subject from "./Subject.js";

class FilterByTagsSubject extends Subject {
  constructor() {
    super();
  }

  fire(action, type, operation) {
    this._observers.forEach((observer) =>
      observer.filterRecipesByTags(action, type, operation)
    );
  }
}

export default FilterByTagsSubject;
