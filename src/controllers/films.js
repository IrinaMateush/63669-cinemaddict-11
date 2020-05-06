import { render, RenderPosition, remove, removeElement } from "../utils/render.js";
import CardComponent from "../components/card.js";
import FilmDetailsComponent from "../components/film-details.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import CommentComponent from "../components/comments.js";
import NoMoviesComponent from "../components/no-movies.js";
import MenuComponent from "../components/menu.js";
import SortComponent from "../components/sort.js";

const EXTRA_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const mainElement = document.querySelector(`.main`);

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

const renderCards = (filmsContainerElement, cards) => {
  cards.forEach((card) => {
    renderCard(filmsContainerElement, card);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noMoviesComponent = new NoMoviesComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._menuComponent = new MenuComponent()
    this._sortComponent = new SortComponent()
  }

  render(cards) {
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list`);
    const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);
    const filmsListExtraElement = container.querySelectorAll(`.films-list--extra`);
    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

    render(mainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(mainElement, this._menuComponent, RenderPosition.AFTERBEGIN);

    if (cards.length == 0) {
      render(filmsListElement, this._noMoviesComponent, RenderPosition.AFTERBEGIN);
      for (let i = 0; i < filmsListExtraElement.length; i++) {
        remove(filmsListExtraElement[i]);
      }
      return;
    }

    renderCards(filmsContainerElement, cards.slice(0, showingCardsCount));

    const renderShowMoreButton = () => {

      if (showingCardsCount >= cards.length) {
        return;
      }

      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevCardsCount = showingCardsCount;
        showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

        renderCards(filmsContainerElement, cards.slice(prevCardsCount, showingCardsCount));

        if (showingCardsCount >= cards.length) {
          remove(this._showMoreButtonComponent.getElement());
          removeElement(this._showMoreButtonComponent);
        }
      });
    };

    renderShowMoreButton();

    for (let i = 0; i < EXTRA_COUNT; i++) {
      const filmsExtraContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);

      renderCards(filmsExtraContainerElement, cards.slice(0, EXTRA_FILMS_COUNT));
    }
  }
}
