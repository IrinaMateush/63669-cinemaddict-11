import moment from "moment";

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomNumber = (min, max) => {
  return (min +  Math.random() * (max - min)).toFixed(1);
};

const getDescription = (array) => {
  const count = getRandomIntegerNumber(1, 3);
  const description = [];
  for (var i = 0; i <= count; i++) {
    description.push(getRandomArrayItem(array));
  }
  return description.join(` `);
};

const getRandomDate = () => {
  const from = moment('1896-01-01T00:00');
  const to = moment();
  let randomDate = moment(getRandomIntegerNumber(from, to));
  return randomDate;
};

const getUserDate = () => {
  let date = moment();
  let userDate = getRandomDate();
  if ((userDate.year() === date.year()) && (userDate.month() === date.month()) && (userDate.day() === date.day())) {
    return userDate = `Today`;
  }
  return userDate.format(`YYYY-MM-DD hh:mm`);
};

const getDuration = (minute) => {
  let hour = (Math.floor(minute / 60))
  minute = minute % 60;
  let duration = hour < 1 ? (minute + `m`) : (hour + `h ` + minute + `m`)
  return duration;
};

export { getRandomArrayItem, getRandomIntegerNumber, getRandomDate, getUserDate, getDescription,  getRandomNumber, getDuration};
