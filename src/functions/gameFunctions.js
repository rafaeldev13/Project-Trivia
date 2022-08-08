import md5 from 'crypto-js/md5';

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const createImageSrc = (email) => {
  const hash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export const disableButton = (parent) => {
  const options = [...parent.children];
  options.forEach((opt) => {
    opt.disabled = true;
  });
};

const getBarElement = (optParents) => {
  const questionContainer = optParents.parentElement;
  const centralize = questionContainer.parentElement;
  const bar = centralize.firstChild;
  return bar;
};

const restartAnimation = (bar) => {
  const removing = bar.offsetHeight;
  return removing;
};

export const setAnimation = (optParents) => {
  const bar = getBarElement(optParents);
  bar.classList.add('bar-animation');
};

export const stopAnimation = (optParents) => {
  const bar = getBarElement(optParents);
  bar.classList.add('stop-animation');
};

export const removeAnimation = (optParents) => {
  const bar = getBarElement(optParents);
  bar.classList.remove('bar-animation');
  bar.classList.remove('stop-animation');
  restartAnimation(bar);
};
