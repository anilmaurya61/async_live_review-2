const fetch = require("node-fetch");


async function initialize() {
  const response = await fetch("http://localhost:3000/initialize");
  const size = await response.json();
  console.log(size);
  return size;
}
function getIndexes(size) {
  let elementIndexes = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      elementIndexes.push([i,j]);
    }
  }
  return elementIndexes;
}

async function getMatrix(elementIndexes, size) {
  let matrix = new Array(size).fill(new Array(size));
  for(let index = 0; index < elementIndexes.length-1; index+=2){
    let element1 = fetch(`http://localhost:3000/value?rowIndex=${elementIndexes[index][0]}&colIndex=${elementIndexes[index][1]}`)
    let element2 = fetch(`http://localhost:3000/value?rowIndex=${elementIndexes[index+1][0]}&colIndex=${elementIndexes[index+1][1]}`)
    let [value1, value2] = await Promise.all([element1,element2])
    value1 = await value1.json();
    value2 = await value2.json();
    matrix[elementIndexes[index][0]][elementIndexes[index][1]] = value1.value;
    matrix[elementIndexes[index+1][0]][elementIndexes[index+1][1]] = value2.value;
  }
  return matrix;
}
async function main() {
  try {
    let size = await initialize();
    let elementIndexes = getIndexes(size.size);
    let matrix = await getMatrix(elementIndexes, size.size);
    console.log(matrix);
  }
  catch (err) {

  }
}
main();
