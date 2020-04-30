import {getRandomArrayItem} from "../function.js";
import {getUserDate} from "../function.js";

export const EMOJI = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];

const generateComment = () => {
  return {
    emoji: `./images/emoji/` + getRandomArrayItem(EMOJI),
    date: getUserDate(),
    author: `Tim Macoveev`,
    message: `Almost two hours? Seriously?`
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
