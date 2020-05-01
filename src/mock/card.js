import {getRandomArrayItem} from "../function.js";
import {getDuration} from "../function.js";
import {getRandomNumber} from "../function.js";
import {getRandomIntegerNumber} from "../function.js";
import {getRandomDate} from "../function.js";
import {getDescription} from "../function.js";
import {generateComments} from "../mock/comment.js";

export const FILM_NAMES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`];

export const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

export const DESCRIPTION = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

export const COMMENT = `nice!`;

export let commentsCount = getRandomIntegerNumber(5, 9);

const GENRE = [`Action`, `Western`, `Drama`, `Mystery`, `Comedy`, `Thriller`, `Romance`];

let minute = getRandomIntegerNumber(3, 300);
let date = getRandomDate();

const generateCard = () => {
  return {
    title: getRandomArrayItem(FILM_NAMES),
    originalName: getRandomArrayItem(FILM_NAMES),
    director: `Anthony Menn`,
    writers:	`Anne Wigton, Heinz Herald, Richard Weil`,
    actors:	`Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: date.format(`DD MMMM YYYY`),
    country: `USA`,
    ageRating: `18+`,
    rating: getRandomNumber(1, 9),
    year: date.year(),
    duration: getDuration(minute),
    genre: getRandomArrayItem(GENRE),
    poster: `./images/posters/` + getRandomArrayItem(POSTERS),
    description: getDescription(DESCRIPTION),
    comments: generateComments(commentsCount)
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards};

