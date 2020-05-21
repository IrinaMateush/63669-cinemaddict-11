import {render, RenderPosition, remove} from "../utils/render.js";
import CardComponent from "../components/card.js";
import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comments.js";

const mainElement = document.querySelector(`.main`);

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._cardComponent = null;
    this._filmDetailComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card) {
    this._card = card;
    this._cardComponent = new CardComponent(card);
    this._filmDetailComponent = new FilmDetailsComponent(card);

    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);

    this._cardComponent.setPosterClickHandler((evt) => {
      evt.preventDefault();
      this._renderPopup();
    });

    this._cardComponent.setTitleClickHandler((evt) => {
      evt.preventDefault();
      this._renderPopup();
    });

    this._cardComponent.setCommentsClickHandler((evt) => {
      evt.preventDefault();
      this._renderPopup();
    });

    this._filmDetailComponent.setCloseClickHandler((evt) => {
      evt.preventDefault();
      remove(this._filmDetailComponent.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._cardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.target.classList.toggle(`film-card__controls-item--active`);
    });

    this._cardComponent.setMarkButtonClickHandler((evt) => {
      evt.target.classList.toggle(`film-card__controls-item--active`);
    });

    this._cardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.target.classList.toggle(`film-card__controls-item--active`);
    });

    this._filmDetailComponent.setWatchlistButtonClickHandler((evt) => {
      evt.target.classList.toggle(`film-details__control-label--active`);
    });

    this._filmDetailComponent.setMarkButtonClickHandler((evt) => {
      evt.target.classList.toggle(`film-details__control-label--active`);
    });

    this._filmDetailComponent.setFavoriteButtonClickHandler((evt) => {
      evt.target.classList.toggle(`film-details__control-label--active`);
    });

  }

  _renderPopup() {
    render(mainElement, this._filmDetailComponent, RenderPosition.BEFOREEND);
    const commentsListElement = this._filmDetailComponent.getElement().querySelector(`.film-details__comments-list`);

    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._card.comments.slice(0, this._card.comments.length)
      .forEach((comment) => render(commentsListElement, new CommentComponent(comment), RenderPosition.BEFOREEND));
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(this._filmDetailComponent.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

}
