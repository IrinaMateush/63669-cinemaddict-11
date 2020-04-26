import moment from "moment";

export const DESCRIPTION = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getDescription = (array) => {
  let count = getRandomIntegerNumber(1, 3);
  let description = new Array;
  for (var i = 0; i <= count; i++) {
    description.push(getRandomArrayItem(array) + ` `);
  }
  return description.join(``);
};

const getRandomDate = () => {
  let date = moment();
  let randomDate = moment().year(getRandomIntegerNumber(1896, date.year())).month(getRandomIntegerNumber(1, 12)).day(getRandomIntegerNumber(1, 30)).hour(getRandomIntegerNumber(0, 23)).minute(getRandomIntegerNumber(0, 59))
  return randomDate;
};

const getUserDate = () => {
  let date = moment();
  let userDate = getRandomDate();
  if ((userDate.year() === date.year()) && (userDate.month() === date.month()) && (userDate.day() === date.day())) {
    return userDate = `Today`;
  }
  return userDate.format("YYYY-MM-DD hh:mm");
};

export { getRandomArrayItem, getRandomIntegerNumber, getRandomDate, getUserDate, getDescription };
