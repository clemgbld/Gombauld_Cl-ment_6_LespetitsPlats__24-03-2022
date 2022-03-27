class Tag {
  constructor(tagName, type) {
    this.tagName = tagName;
    this.type = type;
    this.$container = document.querySelector(".tags");
    this.$btn;
    this.$tag;

    this.init();
  }

  deleteTag() {
    this.$tag.remove();
  }

  init() {
    const tag = document.createElement("div");
    tag.id = `tag__${this.tagName}`;
    tag.className = `tags__tag tags__tag--${this.type}`;
    tag.innerHTML = ` <p class="tags__name">${this.tagName}</p>
        <div id="delete__${this.tagName}" class="tags__icon">
           <ion-icon name="close-circle-outline"></ion-icon>
         </div>`;

    this.$container.appendChild(tag);

    this.$tag = document.getElementById(`tag__${this.tagName}`);
    this.$btn = document.getElementById(`delete__${this.tagName}`);

    const deleteTag = (e) => {
      e.stopPropagation();
      this.$btn.removeEventListener("click", deleteTag);
      this.deleteTag();
    };

    this.$btn.addEventListener("click", (e) => deleteTag(e));
  }
}

export default Tag;
