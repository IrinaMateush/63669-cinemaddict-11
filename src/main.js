import { createUserTitleTemplate } from "../src/components/user-title";
import { createMenuTemplate } from "./components/menu.js";
import { createFilmsTemplate } from "./components/films.js";
import { createCardTemplate } from "./components/card.js";
import { createShowMoreButtonTemplate } from "./components/show-more-button.js";
import { createFilmsCountTemplate } from "./components/films-count.js";
import { createFilmDetailsTemplate } from "./components/film-details.js";
import { generateCard } from "./mock/card.js";
import { generateCards } from "./mock/card.js";
import { createCommentsMarkup } from "./components/film-details.js";

const EXTRA_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;

const CARD_COUNT = 15;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const card = generateCard()
const cards = generateCards(CARD_COUNT)

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

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

cards.slice(0, showingCardsCount)
  .forEach((card) => render(filmsContainerElement, createCardTemplate(card)));

render(filmsListElement, createShowMoreButtonTemplate());

const showMoreButton = mainElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevTasksCount, showingCardsCount)
    .forEach((card) => render(filmsContainerElement, createCardTemplate(card)));

  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
});

const filmsListExtraElement = mainElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < EXTRA_COUNT; i++) {
  const filmsExtraContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);

  cards.slice(0, EXTRA_FILMS_COUNT)
    .forEach((card) => render(filmsExtraContainerElement, createCardTemplate(card)));
}

const footerElement = document.querySelector(`.footer`);

render(footerElement, createFilmsCountTemplate());


render(mainElement, createFilmDetailsTemplate(card));

const commentsListElement = mainElement.querySelector(`.film-details__comments-list`);

card.comments.slice(0, card.comments.length)
  .forEach((comment) => render(commentsListElement, createCommentsMarkup(comment)));

