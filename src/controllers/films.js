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
    this._cards = [];
    this._container = container;
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._showedCardControllers = [];
    this._noMoviesComponent = new NoMoviesComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._menuComponent = new MenuComponent();
    this._sortComponent = new SortComponent();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(cards) {
    this._cards = cards;
    const container = this._container.getElement();

    const filmsContainerElement = container.querySelector(`.films-list__container`);
    const filmsListExtraElement = container.querySelectorAll(`.films-list--extra`);

    render(mainElement, this._sortComponent, RenderPosition.AFTERBEGIN);
    render(mainElement, this._menuComponent, RenderPosition.AFTERBEGIN);

    if (this._cards.length === 0) {
      render(filmsContainerElement, this._noMoviesComponent, RenderPosition.AFTERBEGIN);
      for (let i = 0; i < filmsListExtraElement.length; i++) {
        remove(filmsListExtraElement[i]);
      }
      return;
    }

    renderCards(filmsContainerElement, cards.slice(0, this._showingCardsCount));

    for (let i = 0; i < EXTRA_COUNT; i++) {
      const filmsExtraContainerElement = filmsListExtraElement[i].querySelector(`.films-list__container`);
      renderCards(filmsExtraContainerElement, this._cards.slice(0, EXTRA_FILMS_COUNT));
    }

    this._renderShowMoreButton();
  }


  _renderShowMoreButton() {
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list`);
    const filmsContainerElement = container.querySelector(`.films-list__container`);

    if (this._showingCardsCount >= this._cards.length) {
      return;
    }

    render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {

      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      const sortedCards = getSortedCards(this._cards, this._sortComponent.getSortType(), prevCardsCount, this._showingTasksCount);
      const newCards = renderCards(filmsContainerElement, sortedCards);

      this._showedCardControllers = this._showedCardControllers.concat(newCards);

      if (this._showingCardsCount >= this._cards.length) {
        remove(this._showMoreButtonComponent.getElement());
        removeElement(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    const container = this._container.getElement();
    const filmsContainerElement = container.querySelector(`.films-list__container`);

    this._showingCardsCount = SHOWING_CARDS_COUNT_BY_BUTTON;

    const sortedCards = getSortedCards(this._cards, sortType, 0, this._showingCardsCount);

    filmsContainerElement.innerHTML = ``;

    const newCards = renderCards(filmsContainerElement, sortedCards);
    this._showedCardControllers = newCards;

    this._renderShowMoreButton();
  }
}
