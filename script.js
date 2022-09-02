const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color3 = document.getElementById('color3');
const color4 = document.getElementById('color4');
const arrayColors = [color1, color2, color3, color4];
let pixelBoardPosition = {};
const containerPixels = document.getElementById('pixel-board');
const inputBoardSize = document.getElementById('board-size');
const pixel = document.getElementsByClassName('pixel');
const buttonRandomColor = document.querySelector('#button-random-color');

function randomColorGenerator() {
  const randomColors = {};
  function random(min, max) {
    const result = ((max - min) * Math.random()) + min;
    return Math.floor(result);
  }
  for (let index = 1; index < arrayColors.length; index += 1) {
    const randomColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    arrayColors[index].style.backgroundColor = randomColor;
    randomColors[arrayColors[index].id] = randomColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(randomColors));
}

buttonRandomColor.addEventListener('click', randomColorGenerator);

function reloadScreen() {
  for (let index = 1, cor = 0; index < arrayColors.length; index += 1, cor += 1) {
    const localStorageColors = JSON.parse(localStorage.getItem('colorPalette'));
    if (localStorage.getItem('colorPalette')) {
      arrayColors[index].style.backgroundColor = localStorageColors[cor];
    }
  }
}

reloadScreen();

function updateSelectedElement() {
  const selectedElement = document.getElementsByClassName('selected')[0].style.backgroundColor;
  return selectedElement;
}

function paintPixel(event) {
  const pixelToPaint = event.target;
  pixelToPaint.style.backgroundColor = updateSelectedElement();
  const pixelPosition = event.target.id;
  pixelBoardPosition[pixelPosition] = updateSelectedElement();
  localStorage.setItem('pixelBoard', JSON.stringify(pixelBoardPosition));
}

function createPixelBoard(quantity) {
  for (let index = 1; index <= quantity; index += 1) {
    const pixelDiv = document.createElement('div');
    pixelDiv.className = 'pixel';
    pixelDiv.style.backgroundColor = 'white';
    pixelDiv.id = index;
    containerPixels.appendChild(pixelDiv);
  }
}

function deletePixelBoard() {
  const quantity = pixel.length;
  for (let index = 0; index < quantity; index += 1) {
    pixel[0].remove();
  }
}

function resizeBoard() {
  const number = Number(inputBoardSize.value) * Number(inputBoardSize.value);
  localStorage.setItem('boardSize', number);
  const px = 'px';
  containerPixels.style.width = Number(inputBoardSize.value) * 42 + px;
  deletePixelBoard();
  createPixelBoard(localStorage.getItem('boardSize'));
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].addEventListener('click', paintPixel);
  }
}

createPixelBoard(25);

