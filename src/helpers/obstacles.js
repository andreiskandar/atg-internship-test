const min = 0;
const max = 20;

const rand = () => {
  return Math.ceil(Math.floor(Math.random() * max) + min);
};

const obstaclesCoordinate = () => {
  let ob = [];
  for (let i = 0; i < 3; i++) {
    ob[i] = [rand(), rand()];
  }

  if (ob[0] === ob[1] || ob[0] === ob[2] || ob[1] === ob[2]) {
    ob = obstaclesCoordinate();
  }

  return ob;
};

const map = () => {
  const ob = obstaclesCoordinate();
  const obLeng = ob.length;
  const fieldMap = [];

  console.log('ob:', ob);

  // for (let h = 0; h < obLeng; h++) {
  for (let i = 0; i < max; i++) {
    for (let j = 0; j < max; j++) {
      if (i === ob[0][0] && j === ob[0][1]) {
        console.log(' 1 ');
      } else {
        console.log(' 0 ');
      }
    }
    console.log('\n');
  }
  // }
  console.log('fieldMap:', fieldMap);
  return fieldMap;
};

map();
module.exports = { obstaclesCoordinate };
