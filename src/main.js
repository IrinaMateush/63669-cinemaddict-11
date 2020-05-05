import { generateCards } from "./mock/card.js";
import { render, RenderPosition } from "./utils/render.js";
import FilmsCountComponent from "./components/films-count.js";
import FilmsComponent from "./components/films.js";
import MenuComponent from "./components/menu.js";
import SortComponent from "./components/sort.js";
import UserTitleComponent from "./components/user-title.js";

import FilmController from "./controllers/films.js";

const CARD_COUNT = 15;
const cards = generateCards(CARD_COUNT)

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, new UserTitleComponent(), RenderPosition.BEFOREEND);
render(mainElement, new MenuComponent(), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent(), RenderPosition.BEFOREEND);
const footerElement = document.querySelector(`.footer`);
render(footerElement, new FilmsCountComponent(), RenderPosition.BEFOREEND);


const filmsComponent = new FilmsComponent();
const filmController = new FilmController(filmsComponent);
render(mainElement, filmsComponent, RenderPosition.BEFOREEND);
filmController.render(cards);

