const buttonColor = document.getElementById('button-random-color');
const buttonClear = document.getElementById('clear-board');
const buttonBoard = document.getElementById('generate-board');
const boardBox = document.getElementById('pixel-board');
const selected = document.getElementsByClassName('selected');
const colorSection = document.getElementById('color-palette').children;
const lineSection = document.getElementsByClassName('boardLine');
let pixelSection = document.getElementsByClassName('pixel');

function baseColor() {
  const baseColorArray = ['black', 'red', 'yellow', 'blue'];
  colorSection[0].classList.add('selected');
  for (let i = 0; i < baseColorArray.length; i += 1) {
    colorSection[i].style.backgroundColor = baseColorArray[i];
  }
}

baseColor();
let selectedColor = selected[0].style.backgroundColor;

function storageLocal() {
  const boardArray = [];
  for (let i = 0; i < pixelSection.length; i += 1) {
    boardArray.push(pixelSection[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(boardArray));
}

function exportLocal() {
  if (localStorage.pixelBoard) {
    const artReturn = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let i = 0; i < artReturn.length; i += 1) {
      pixelSection[i].style.backgroundColor = artReturn[i];
    }
  }
}

function storageInPalette(colorArray) {
  localStorage.setItem('colorPalette', JSON.stringify(colorArray));
}

function exportPalette() {
  if (localStorage.colorPalette) {
    const paletteReturn = JSON.parse(localStorage.getItem('colorPalette'));
    for (let i = 1; i <= paletteReturn.length; i += 1) {
      colorSection[i].style.backgroundColor = paletteReturn[i - 1];
    }
  }
}

function randomizeColors() {
  const colorArray = [];
  for (let i = 1; i < colorSection.length - 1; i += 1) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const colorOutput = `#${randomColor}`;
    colorSection[i].style.backgroundColor = colorOutput;
    colorArray.push(colorOutput);
  }
  storageInPalette(colorArray);
}

function colorSelect(event) {
  for (let index = 0; index < selected.length; index += 1) {
    selected[index].classList.remove('selected');
  }
  const clickedColor = event.target;
  clickedColor.classList.add('selected');
  selectedColor = clickedColor.style.backgroundColor;
}

function colorPick() {
  for (let i = 0; i < colorSection.length - 1; i += 1) {
    colorSection[i].addEventListener('click', colorSelect);
  }
}

function colorDrop(event) {
  const clickedPixel = event.target;
  clickedPixel.style.backgroundColor = selectedColor;
  storageLocal();
}

function pixelClear() {
  for (let i = 0; i < pixelSection.length; i += 1) {
    pixelSection[i].style.backgroundColor = 'white';
  }
}

function storageInBoard(numSize) {
  localStorage.setItem('boardSize', numSize);
}

function pixelSelected() {
  for (let i = 0; i < pixelSection.length; i += 1) {
    pixelSection[i].addEventListener('click', colorDrop);
  }
}

function boardX(i, sizeN) {
  for (let j = 0; j < sizeN; j += 1) {
    const newPixel = document.createElement('span');
    newPixel.className = 'pixel';
    lineSection[i].appendChild(newPixel);
  }
  pixelSection = document.getElementsByClassName('pixel');
}

function boardY(sizeN) {
  for (let i = 0; i < sizeN; i += 1) {
    const newLine = document.createElement('div');
    newLine.className = 'boardLine';
    boardBox.appendChild(newLine);
    boardX(i, sizeN);
  }
  pixelSelected();
}

function boardClear() {
  while (boardBox.hasChildNodes()) {
    boardBox.removeChild(boardBox.firstChild);
  }
}

function boardCheck(numSize) {
  boardClear();
  if (numSize < 5) {
    boardY(5);
  } else if (numSize > 50) {
    boardY(50);
  } else {
    boardY(parseFloat(numSize));
  }
}

function boardBtn() {
  const numSize = document.getElementById('board-size').value;
  if (!numSize) {
    alert('Board inválido!');
  } else {
    storageInBoard(numSize);
    boardCheck(numSize);
  }
}

function exportBoard() {
  if (localStorage.boardSize) {
    const boardReturn = localStorage.getItem('boardSize');
    boardY(parseFloat(boardReturn));
    document.getElementById('board-size').value = parseFloat(boardReturn);
  } else {
    boardY(5);
  }
}

function onLoad() {
  if (Storage) {
    colorPick();
    exportBoard();
    exportPalette();
    exportLocal();
  } else {
    document.write('Sem suporte para Web Storage');
  }
}

window.addEventListener('load', onLoad);
buttonColor.addEventListener('click', randomizeColors);
buttonClear.addEventListener('click', pixelClear);
buttonBoard.addEventListener('click', boardBtn);
