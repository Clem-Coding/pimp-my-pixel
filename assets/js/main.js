/**************************************************************/
/*                         Données                         */
/**************************************************************/
let palette = document.querySelector(".palette");
let board = document.querySelector(".board-container");
let generateGridBtn = document.querySelector(".js-generate-grid");
let colorPickers = document.querySelectorAll(".color-input");
let clearBtn = document.querySelector(".clear-btn");
let glitchBtn = document.querySelector(".glitch-btn");
let eraserBtn = document.querySelector(".eraser-btn");
let brushBtn = document.querySelector(".brush-btn");

let MouseDown = false;
let eraserSelected = false;
let brushSelected = false;

console.log("le bouton paint", brushBtn);

/**************************************************************/
/*                         Fonctions                            */
/**************************************************************/

// ________________Fonction pour générer les cases du paintboard________________________

function generateGrid(gridSize = 10) {
  // Valeur par défaut de 10x10

  gridSize = parseInt(document.getElementById("grid-size").value);
  const totalBoxes = gridSize * gridSize;
  board.innerHTML = "";

  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < totalBoxes; i++) {
    const boardBoxes = document.createElement("div");
    boardBoxes.className = "board-boxes";
    board.appendChild(boardBoxes);
  }
}

// ____________________ Fonctions Local Storage _______________________________
function selectColor(event) {
  let colorPalette = event.target;

  let selectedColor = colorPalette.value;
  console.log("selected color", selectedColor);
  sessionStorage.setItem("selectedColor", selectedColor); // Stocke la couleur dans sessionStorage
}

function getSelectedColor() {
  if (sessionStorage.getItem("selectedColor")) {
    return sessionStorage.getItem("selectedColor");
  }
  return null; // Pourquoi null?
}

//___________ Fonctions pour le pinceau________________

function colorOnCells() {
  const boardBoxes = document.querySelectorAll(".board-boxes");

  if (brushSelected) {
    boardBoxes.forEach((box) => {
      box.removeEventListener("mouseover", deleteColorOnCells);
      box.addEventListener("mouseover", loadSelectedColor);
    });
  }
}

function loadSelectedColor(event) {
  let cellMain = event.target;
  let selectedColor = getSelectedColor();

  if (MouseDown) {
    cellMain.style.backgroundColor = selectedColor;
  }
}

// ________ Fonctions pour la gomme ______________
function deleteColorOnCells(event) {
  let cellMain = event.target;
  console.log("cell main fonction erase", cellMain);
  if (MouseDown) {
    cellMain.style.backgroundColor = "";
  }
}

function erasePaint() {
  const boardBoxes = document.querySelectorAll(".board-boxes");

  if (eraserSelected) {
    console.log("la gomme est sélectionnée");
    boardBoxes.forEach((box) => {
      box.removeEventListener("mouseover", loadSelectedColor);
      box.addEventListener("mouseover", deleteColorOnCells);
    });
  }
}

//_________ Fonction pour clear le board_______________________

function clearPaintBoard() {
  const boardBoxes = document.querySelectorAll(".board-boxes");
  boardBoxes.forEach((box) => {
    box.style.backgroundColor = "";
  });
}

/************************************************************/
/*                      Main Programm                      */
/**************************************************************/

window.addEventListener("DOMContentLoaded", function () {
  generateGrid(); // affiche la grille par défaut
  generateGridBtn.addEventListener("click", () => {
    generateGrid();
    colorOnCells();
  });

  colorPickers.forEach((input) => {
    input.addEventListener("input", selectColor);
  });

  document.addEventListener("mousedown", function () {
    console.log("la souris est enfoncée");
    MouseDown = true;
  });

  document.addEventListener("mouseup", function () {
    console.log("la souris est relevée");
    MouseDown = false;
  });

  eraserBtn.addEventListener("click", () => {
    eraserBtn.classList.toggle("active");
    brushBtn.classList.remove("active");
    eraserSelected = true;
    brushSelected = false;
    erasePaint();
  });

  brushBtn.addEventListener("click", () => {
    brushBtn.classList.toggle("active");
    eraserBtn.classList.remove("active");
    brushSelected = true;
    eraserSelected = false;
    colorOnCells();
  });
});

glitchBtn.addEventListener("click", () => {
  glitchBtn.classList.toggle("active");
  const boardBoxes = document.querySelectorAll(".board-boxes");

  boardBoxes.forEach((cell) => {
    cell.classList.toggle("glitch");
  });
});

clearBtn.addEventListener("click", clearPaintBoard);
