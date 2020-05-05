import { generateCards } from "./mock/card.js";
import { render, RenderPosition, remove, removeElement } from "./utils/render.js";
import CardComponent from "./components/card.js";
import FilmDetailsComponent from "./components/film-details.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import FilmsCountComponent from "./components/films-count.js";
import FilmsComponent from "./components/films.js";
import CommentComponent from "./components/comments.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import UserTitleComponent from "./components/user-title.js";
import NoMoviesComponent from "./components/no-movies.js";

const EXTRA_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;

const CARD_COUNT = 15;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const cards = generateCards(CARD_COUNT)

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, new UserTitleComponent(), RenderPosition.BEFOREEND);
render(mainElement, new MenuComponent(), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent(), RenderPosition.BEFOREEND);

const renderCard = (filmsContainerElement, card) => {
  const cardComponent = new CardComponent(card);
  render(filmsContainerElement, cardComponent, RenderPosition.BEFOREEND);

  cardComponent.setPosterClickHandler((evt) => {
    evt.preventDefault();
    renderPopup();
  });

  cardComponent.setTitleClickHandler((evt) => {
    evt.preventDefault();
    renderPopup();
  });

  cardComponent.setCommentsClickHandler((evt) => {
    evt.preventDefault();
    renderPopup();
  });

  const popupElement = new FilmDetailsComponent(card);

  popupElement.setCloseClickHandler((evt) => {
    evt.preventDefault();
    remove(popupElement.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(popupElement.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const renderPopup = () => {
    render(mainElement, popupElement, RenderPosition.BEFOREEND);
    const commentsListElement = popupElement.getElement().querySelector(`.film-details__comments-list`);
    document.addEventListener(`keydown`, onEscKeyDown);

    card.comments.slice(0, card.comments.length)
      .forEach((comment) => render(commentsListElement, new CommentComponent(comment), RenderPosition.BEFOREEND));
  };
};

const renderFilmsСontainer = (filmsComponent, cards) => {
  const filmsListElement = filmsComponent.getElement().querySelector(`.films-list`);
  const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);
  const filmsListExtraElement = filmsComponent.getElement().querySelectorAll(`.films-list--extra`);

  if (cards.length == 0) {
    render(filmsListElement, new NoMoviesComponent(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < filmsListExtraElement.length; i++) {
      remove(filmsListExtraElement[i]);
    }
    return;
  }

  let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
  cards.slice(0, showingCardsCount)
    .forEach((card) => renderCard(filmsContainerElement, card));

  const showMoreButton = new ShowMoreButtonComponent();
  render(filmsListElement, showMoreButton, RenderPosition.BEFOREEND);

  showMoreButton.setClickHandler(() => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    cards.slice(prevCardsCount, showingCardsCount)
      .forEach((card) => renderCard(filmsContainerElement, card));

    if (showingCardsCount >= cards.length) {
      remove(showMoreButton.getElement());
      removeElement(showMoreButton);
    }
  });

  for (let i = 0; i < EXTRA_COUNT; i++) {
    const filmsExtraContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);

    cards.slice(0, EXTRA_FILMS_COUNT)
      .forEach((card) => renderCard(filmsExtraContainerElement, card));
  }
};

const filmsComponent = new FilmsComponent();
render(mainElement, filmsComponent, RenderPosition.BEFOREEND);
renderFilmsСontainer(filmsComponent, cards);

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FilmsCountComponent(), RenderPosition.BEFOREEND);
