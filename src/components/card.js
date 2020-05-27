import AbstractComponent from "../components/abstract-component";

const createButtonMarkup = (name, isActive = true) => {
  return (
    `<button
      type="button"
      class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `` : `film-card__controls-item--active`}"
    >
      ${name}
    </button>`
  );
};

const createCardTemplate = (card) => {
  const {title, rating, year, duration, genre, poster, description, comments} = card;

  const addToWatchlistButton = createButtonMarkup(`add-to-watchlist`, !card.isAddToWatchlist);
  const markAsWatchedButton = createButtonMarkup(`mark-as-watched`, !card.isMarkAsWatched);
  const favoriteButton = createButtonMarkup(`favorite`, !card.isFavorite);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          ${addToWatchlistButton}
          ${markAsWatchedButton}
          ${favoriteButton}
        </form>
    </article>`
  );
};

export default class Card extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
