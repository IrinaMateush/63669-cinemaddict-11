import {render, RenderPosition, remove} from "../utils/render.js";
import CardComponent from "../components/card.js";
import FilmDetailsComponent from "../components/film-details.js";
import CommentComponent from "../components/comments.js";

const mainElement = document.querySelector(`.main`); //?

export default class CardController {
  constructor(container) {
    this._container = container;

    this._cardComponent = null;
    this._filmDetailComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card) {
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
  }

  _renderPopup() {
    render(mainElement, this._filmDetailComponent, RenderPosition.BEFOREEND); //?
    const commentsListElement = this._filmDetailComponent.getElement().querySelector(`.film-details__comments-list`);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    card.comments.slice(0, card.comments.length) //?
      .forEach((comment) => render(commentsListElement, new CommentComponent(comment), RenderPosition.BEFOREEND)); //?
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(this._filmDetailComponent.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

}
