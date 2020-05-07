import { generateCards } from "./mock/card.js";
import { render, RenderPosition } from "./utils/render.js";
import FilmsCountComponent from "./components/films-count.js";
import FilmsComponent from "./components/films.js";

import UserTitleComponent from "./components/user-title.js";

import PageController from "./controllers/films.js";

const CARD_COUNT = 15;
const cards = generateCards(CARD_COUNT)

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, new UserTitleComponent(), RenderPosition.BEFOREEND);
const footerElement = document.querySelector(`.footer`);
render(footerElement, new FilmsCountComponent(), RenderPosition.BEFOREEND);


const filmsComponent = new FilmsComponent();
const pageController = new PageController(filmsComponent);
render(mainElement, filmsComponent, RenderPosition.BEFOREEND);
pageController.render(cards);

