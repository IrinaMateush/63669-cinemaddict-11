import {createElement} from "../utils.js";

const createFilmsCountTemplate = () => {

  const count = Math.floor(Math.random() * 10000);

  return (
    `<section class="footer__statistics">
      <p>${count} movies inside</p>
    </section>`
  );
};

export default class FilmsCount {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsCountTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
