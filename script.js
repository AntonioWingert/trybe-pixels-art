const buttonCreateRandomColor = document.querySelector('#button-random-color');
buttonCreateRandomColor.addEventListener("click", function() {
  const divsColor = document.querySelectorAll('.color');
  for (let index = 0; index < divsColor.length; index += 1) {
    if (divsColor[index] !== 'div.color.black') {
      divsColor.classList.add();
    };
  }; 
});
