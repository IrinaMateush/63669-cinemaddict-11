import {createUserTitleTemplate} from "../src/components/user-title";
import {createMenuTemplate} from "./components/menu.js";
import {createFilmsTemplate} from "./components/films.js";
import {createCardTemplate} from "./components/card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmsCountTemplate} from "./components/films-count.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";

const CARD_COUNT = 5;
const EXTRA_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, createUserTitleTemplate());
render(mainElement, createMenuTemplate());
render(mainElement, createFilmsTemplate());

const filmsListElement = mainElement.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsContainerElement, createCardTemplate());
}

render(filmsListElement, createShowMoreButtonTemplate());

const filmsListExtraElement = mainElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < EXTRA_COUNT; i++) {
  const filmsExtraContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);

  for (let j = 0; j < EXTRA_FILMS_COUNT; j++) {
    render(filmsExtraContainerElement, createCardTemplate());
  }
}

const footerElement = document.querySelector(`.footer`);
render(footerElement, createFilmsCountTemplate());

render(mainElement, createFilmDetailsTemplate());
