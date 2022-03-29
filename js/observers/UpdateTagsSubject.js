import Subject from "./Subject.js";

class UpdateTagsSubject extends Subject {
  constructor() {
    super();
  }

  fire(action) {
    this._observers.forEach((observer) => observer.fillTagsContainer(action));
  }
}

export default UpdateTagsSubject;
