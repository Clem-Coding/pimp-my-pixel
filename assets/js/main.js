/**************************************************************/
/*                         DATA                               */
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

/**************************************************************/
/*                       FUNCTIONS                            */
/**************************************************************/

// ________________Generate Grid________________________

function generateGrid(gridSize = 10) {
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

// ____________________ Local Storage _______________________________

function loadDefaultColor() {
  if (!getSelectedColor()) {
    const defaultColor = "#000000";
    sessionStorage.setItem("selectedColor", defaultColor);
  }
}

function selectColor(event) {
  let colorPalette = event.target;
  let selectedColor = colorPalette.value;

  sessionStorage.setItem("selectedColor", selectedColor);

  if (MouseDown && brushSelected) {
    const boardBoxes = document.querySelectorAll(".board-boxes");
    boardBoxes.forEach((box) => {
      box.style.backgroundColor = selectedColor;
    });
  }
}

function getSelectedColor() {
  if (sessionStorage.getItem("selectedColor")) {
    return sessionStorage.getItem("selectedColor");
  }
  return null;
}

//___________ Brush functions________________

function colorOnCells() {
  const boardBoxes = document.querySelectorAll(".board-boxes");
  if (brushSelected) {
    boardBoxes.forEach((box) => {
      box.addEventListener("mousemove", (event) => {
        if (MouseDown) {
          loadSelectedColor(event);
        }
      });

      box.addEventListener("click", (event) => {
        loadSelectedColor(event);
      });
    });
  }
}

function loadSelectedColor(event) {
  let mainCell = event.target;
  let selectedColor = getSelectedColor();
  mainCell.style.backgroundColor = selectedColor;
}

// ________ Eraser functions   ______________

function erasePaint() {
  const boardBoxes = document.querySelectorAll(".board-boxes");

  if (eraserSelected) {
    boardBoxes.forEach((box) => {
      box.addEventListener("mousemove", (event) => {
        if (MouseDown) {
          deleteColorOnCells(event);
        }
      });
      box.addEventListener("click", deleteColorOnCells);
    });
  }
}

function deleteColorOnCells(event) {
  let mainCell = event.target;
  mainCell.style.backgroundColor = "";
}

//_________ _______________________

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
  loadDefaultColor();
  generateGrid();

  document.addEventListener("mousedown", function (event) {
    if (event.target.closest("select")) return;
    event.preventDefault();
    MouseDown = true;
  });

  document.addEventListener("mouseup", function (event) {
    event.preventDefault();
    MouseDown = false;
  });

  brushSelected = true;
  brushBtn.classList.add("active");
  colorOnCells();

  generateGridBtn.addEventListener("click", () => {
    generateGrid();
    colorOnCells();
  });

  colorPickers.forEach((input) => {
    input.addEventListener("change", selectColor);
    input.addEventListener("click", selectColor);
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
