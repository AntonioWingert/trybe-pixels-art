const palettColors = document.getElementsByClassName('color');
const containerPixels = document.getElementById('pixel-board');
const inputBoardSize = document.getElementById('board-size');
const pixel = document.getElementsByClassName('pixel');
const buttonRandomColor = document.querySelector('#button-random-color');
let pixelBoardPosition = {};

function randomColorGenerator() {
  const randomColors = {};
  function random(min, max) {
    const result = ((max - min) * Math.random()) + min;
    return Math.floor(result);
  }
  for (let index = 1; index < palettColors.length; index += 1) {
    const randomColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    palettColors[index].style.backgroundColor = randomColor;
    randomColors[palettColors[index].id] = randomColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(randomColors));
}

buttonRandomColor.addEventListener('click', randomColorGenerator);

function actualColorPalette() {
  for (let i = 1, cor = 0; i <= palettColors.length; i += 1, cor += 1) {
    const localStorageColors = JSON.parse(localStorage.getItem('colorPalette'));
    palettColors[i].style.backgroundColor = localStorageColors[cor];
  }
}

actualColorPalette();

function updateSelectedElement() {
  const selectedElement = document.getElementsByClassName('selected')[0].style.backgroundColor;
  return selectedElement;
}

function paintPixels(event) {
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
    pixel[index].addEventListener('click', paintPixels);
  }
}

createPixelBoard(25);
