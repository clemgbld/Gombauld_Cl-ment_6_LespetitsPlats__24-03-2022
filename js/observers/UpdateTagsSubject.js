import Subject from "./Subject.js";

class UpdateTagsSubject extends Subject {
  constructor() {
    super();
  }

  fire(action) {
    this._observers.forEach((observer) => observer.fillTagsContainer(action));
  }
}

export class UpdateIngredientTagsSubject extends UpdateTagsSubject {
  constructor() {
    super();
  }
}

export class UpdateApplianceTagsSubject extends UpdateTagsSubject {
  constructor() {
    super();
  }
}

export class UpdateUstensilTagsSubject extends UpdateTagsSubject {
  constructor() {
    super();
  }
}
