import AbstractComponent from "./abstract-component.js";

const createFilmsCountTemplate = () => {

  const count = Math.floor(Math.random() * 10000);

  return (
    `<section class="footer__statistics">
      <p>${count} movies inside</p>
    </section>`
  );
};

export default class FilmsCount extends AbstractComponent{
  getTemplate() {
    return createFilmsCountTemplate();
  }
}
