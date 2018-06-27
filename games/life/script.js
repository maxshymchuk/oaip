const fieldPixelSize = 400;
const fieldSize = 400;
const size = fieldPixelSize / fieldSize;
const field = document.getElementById("field");
const context = field.getContext("2d");
let isPlaying = false;
let isBordered = false;
let fieldArray = initArray();

context.fillStyle = '#000';
context.fillRect(0, 0, fieldPixelSize, fieldPixelSize);

function fillRandom()
{
  let tempArray = [];
  for (let i = 0; i < fieldSize; i++) {
    tempArray[i] = [];
    for (let j = 0; j < fieldSize; j++) {
      tempArray[i][j] = Math.round(Math.random());
    }
  }
  return tempArray;
}

function initArray()
{
  let tempArray = [];
  for (let i = 0; i < fieldSize; i++) {
    tempArray[i] = [];
    tempArray[i].fill(0);
  }
  return tempArray;
}

function getOppositeCoord(coord)
{
  if (coord < 0) {
    return fieldSize - 1;
  } 
  if (coord > fieldSize - 1) {
    return 0;
  }
  return coord;
}

function checkNeighbors(y, x)
{
  let n = 0;
  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      if (isBordered && i >= 0 && i < fieldSize && j >= 0 && j < fieldSize && fieldArray[i][j] || !isBordered && fieldArray[getOppositeCoord(i)][getOppositeCoord(j)]) {
        n++;
      }
    }
  }
  if (fieldArray[y][x] == 1 && n > 0) n--;
  return n;
}

function calculate()
{
  let tempArray = initArray();
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      switch (checkNeighbors(i, j)) {
        case 2: 
          tempArray[i][j] = fieldArray[i][j];
          break;
        case 3: 
          tempArray[i][j] = 1;
          break;
      }
    }
  }
  fieldArray = tempArray;
}

function drawField() 
{
  context.fillStyle = '#000';
  context.fillRect(0, 0, fieldPixelSize, fieldPixelSize);
  context.fillStyle = '#FFF';
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      if (fieldArray[i][j]) {
        context.fillRect(j * size, i * size, size, size);
      }
    }
  }
}

function clearField() 
{
  fieldArray = initArray();
  drawField();
}

function randomField() 
{
  fieldArray = fillRandom();
  drawField();
}

function step() 
{
  calculate();
  drawField();
}

function changeParams() 
{
  isBordered = !isBordered;
}

function playpause() 
{
  isPlaying = !isPlaying;
  let timerId = setInterval(function() {
    step();
    if (!isPlaying) clearInterval(timerId);
  }, 4);
  if (isPlaying) {
    document.getElementById('playPauseButton').innerHTML = 'PAUSE';
  } else {
    document.getElementById('playPauseButton').innerHTML = 'PLAY';
  }
}

function init() {
  isBordered = document.getElementById('borderSwitch').checked;
}