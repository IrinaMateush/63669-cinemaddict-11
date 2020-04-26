import {getRandomArrayItem} from "../function.js";
import {getRandomIntegerNumber} from "../function.js";
import {getRandomDate} from "../function.js";
import {getDescription} from "../function.js";

export const FILM_NAMES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`];

export const POSTERS = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

export const DESCRIPTION = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

export const COMMENT = `nice!`;

const GENRE = [`Action`, `Western`, `Drama`, `Mystery`, `Comedy`, `Thriller`, `Romance`];

const generateCard = () => {
  return {
    title: getRandomArrayItem(FILM_NAMES),
    rating: getRandomIntegerNumber(1, 9) + `.` + getRandomIntegerNumber(1, 9),
    year: getRandomDate().year(),
    duration: getRandomIntegerNumber(1, 5) + `h ` + getRandomIntegerNumber(0, 59) + `m`,
    genre: getRandomArrayItem(GENRE),
    poster: `./images/posters/` + getRandomArrayItem(POSTERS),
    description: getDescription(DESCRIPTION)
  };
};

const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};


export {generateCard, generateCards};

