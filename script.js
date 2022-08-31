const buttonCreateRandomColor = document.querySelector('#button-random-color');
const color2 = document.querySelector('#color2');
const color3 = document.querySelector('#color3');
const color4 = document.querySelector('#color4');
const arrayColors = [color2, color3, color4];
const localColours = JSON.parse(localStorage.getItem('colorPalette'));
if (localColours != null) {
  for (let index = 0; index < 3; index += 1) {
    arrayColors[index].style.backgroundColor = localColours[arrayColors[index].id];
  }
}

function random(min, max) {
  const result = ((max - min) * Math.random()) + min;
  return Math.floor(result);
}

function generateColors() {
  const newColours = {};
  for (let index = 0; index < 3; index += 1) {
    const newColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    arrayColors[index].style.backgroundColor = newColor;
    newColours[arrayColors[index].id] = newColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(newColours));
}

buttonCreateRandomColor.addEventListener('click', generateColors);

