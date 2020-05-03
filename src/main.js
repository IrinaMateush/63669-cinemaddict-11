import { generateCards } from "./mock/card.js";
import { render, RenderPosition } from "./utils.js";
import CardComponent from "./components/card.js";
import FilmDetailsComponent from "./components/film-details.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import FilmsCountComponent from "./components/films-count.js";
import FilmsComponent from "./components/films.js";
import CommentComponent from "./components/comments.js";
import MenuComponent from "./components/menu.js";
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

render(headerElement, new UserTitleComponent().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MenuComponent().getElement(), RenderPosition.BEFOREEND);

const renderCard = (filmsContainerElement, card) => {
  const cardComponent = new CardComponent(card);
  render(filmsContainerElement, cardComponent.getElement(), RenderPosition.BEFOREEND);

  const onCardElementClick = (evt) => {
    evt.preventDefault();
    renderPopup();
  };

  const onPopupCloseClick = (evt) => {
    evt.preventDefault();
    popupElement.getElement().remove();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      popupElement.getElement().remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const cardPoster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const cardTitle = cardComponent.getElement().querySelector(`.film-card__title`);
  const cardComment = cardComponent.getElement().querySelector(`.film-card__comments`);
  cardPoster.addEventListener(`click`, onCardElementClick);
  cardTitle.addEventListener(`click`, onCardElementClick);
  cardComment.addEventListener(`click`, onCardElementClick);

  const popupElement = new FilmDetailsComponent(card);
  const renderPopup = () => {
    render(mainElement, popupElement.getElement(), RenderPosition.BEFOREEND);
    const commentsListElement = popupElement.getElement().querySelector(`.film-details__comments-list`);
    const popupCloseButton = popupElement.getElement().querySelector(`.film-details__close-btn`);

    popupCloseButton.addEventListener(`click`, onPopupCloseClick);
    document.addEventListener(`keydown`, onEscKeyDown);

    card.comments.slice(0, card.comments.length)
      .forEach((comment) => render(commentsListElement, new CommentComponent(comment).getElement(), RenderPosition.BEFOREEND));
  };
};

const renderFilmsСontainer = (filmsComponent, cards) => {
  const filmsSectionElement = mainElement.querySelector(`.films`);

  if (cards.length == 0) {
    render(filmsSectionElement, new NoMoviesComponent().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  const filmsListElement = filmsComponent.getElement().querySelector(`.films-list`);
  const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);
  const filmsListExtraElement = mainElement.querySelectorAll(`.films-list--extra`);

  let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
  cards.slice(0, showingCardsCount)
    .forEach((card) => renderCard(filmsContainerElement, card));

  const showMoreButton = new ShowMoreButtonComponent();
  render(filmsListElement, showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.getElement().addEventListener(`click`, () => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

    cards.slice(prevCardsCount, showingCardsCount)
      .forEach((card) => renderCard(filmsContainerElement, card));

    if (showingCardsCount >= cards.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });

  for (let i = 0; i < EXTRA_COUNT; i++) {
    const filmsExtraContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);

    cards.slice(0, EXTRA_FILMS_COUNT)
      .forEach((card) => renderCard(filmsExtraContainerElement, card));
  }
};

const filmsComponent = new FilmsComponent();
render(mainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);
renderFilmsСontainer(filmsComponent, cards);

const footerElement = document.querySelector(`.footer`);
render(footerElement, new FilmsCountComponent().getElement(), RenderPosition.BEFOREEND);
