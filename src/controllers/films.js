import {render, RenderPosition, remove, removeElement} from "../utils/render.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import NoMoviesComponent from "../components/no-movies.js";
import MenuComponent from "../components/menu.js";
import SortComponent, {SortType} from "../components/sort.js";
import CardController from "../controllers/card.js";

const EXTRA_COUNT = 2;
const EXTRA_FILMS_COUNT = 2;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const mainElement = document.querySelector(`.main`);

const renderCards = (filmsContainerElement, cards) => {
  return cards.map((card) => {
    const cardController = new CardController(filmsContainerElement);
    cardController.render(card);
    return cardController;
  });
};

const getSortedCards = (cards, sortType, from, to) => {
  const showingCards = cards.slice();

  switch (sortType) {
    case SortType.BY_RATING:
      showingCards.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.BY_DATE:
      showingCards.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.DEFAULT:
      break;
  }

  return showingCards.slice(from, to);
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._noMoviesComponent = new NoMoviesComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._menuComponent = new MenuComponent();
    this._sortComponent = new SortComponent();
  }

  render(cards) {
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list`);
    const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);
    const filmsListExtraElement = container.querySelectorAll(`.films-list--extra`);
    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

    render(mainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(mainElement, this._menuComponent, RenderPosition.AFTERBEGIN);

    if (cards.length === 0) {
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

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingCardsCount = SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedCards = getSortedCards(cards, sortType, 0, showingCardsCount);

      filmsContainerElement.innerHTML = ``;

      renderCards(filmsContainerElement, sortedCards);

      renderShowMoreButton();
    });
  }
}
