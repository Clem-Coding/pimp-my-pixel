/**************************************************************/
/*                         Données                         */
/**************************************************************/
let palette = document.querySelector(".palette");
let board = document.querySelector(".board-container");
let generateGridBtn = document.querySelector(".js-generate-grid");
let colorPickers = document.querySelectorAll(".color-input");
let clearBtn = document.querySelector(".clear-btn");

console.log(clearBtn);

/**************************************************************/
/*                         Fonctions                            */
/**************************************************************/

// ________________Fonction pour générer les cases du paintboard________________________

function generateGrid(gridSize = 10) {
  // Valeur par défaut de 10x10

  console.log("je teste la grille");

  gridSize = parseInt(document.getElementById("grid-size").value);
  console.log("Taille de la grille:", gridSize);

  // Réinitialiser le contenu de la grille
  board.innerHTML = "";

  // Définir le nombre de cases
  const totalBoxes = gridSize * gridSize;

  // Mettre à jour le style de la grille
  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  // crée les cases
  for (let i = 0; i < totalBoxes; i++) {
    const boardBoxes = document.createElement("div");
    boardBoxes.className = "board-boxes";
    board.appendChild(boardBoxes);
  }
}

// ____________________ Fonctions Local Storage _______________________________
function selectColor(event) {
  let colorPalette = event.target;
  console.log("colorPalette", colorPalette);

  let selectedColor = colorPalette.value; // Récupère la valeur sélectionnée
  console.log("selected color", selectedColor);
  sessionStorage.setItem("selectedColor", selectedColor); // Stocke la couleur dans sessionStorage
}

function getSelectedColor() {
  if (sessionStorage.getItem("selectedColor")) {
    return sessionStorage.getItem("selectedColor");
  }
  return null; // Pourquoi null?
}

//_________ Fonction pour charger la couleur choisie dans la palette____________

function loadSelectedColor(event) {
  console.log("je commence à colorier");
  let cellMain = event.target;
  let selectedColor = getSelectedColor();

  if (MouseDown) {
    cellMain.style.backgroundColor = selectedColor;
  }
}

//___________ Fonctions pour activer et désactiver le coloriage________________

let MouseDown = false;

function colorOnCells() {
  const boardBoxes = document.querySelectorAll(".board-boxes");
  MouseDown = true;

  boardBoxes.forEach((box) => {
    box.addEventListener("mouseover", loadSelectedColor);
  });
}

function stopColoring() {
  const boardBoxes = document.querySelectorAll(".board-boxes");
  MouseDown = false;

  boardBoxes.forEach((box) => {
    box.removeEventListener("mouseover", loadSelectedColor);
  });
}

function clearPaintBoard() {
  const boardBoxes = document.querySelectorAll(".board-boxes");
  boardBoxes.forEach((box) => {
    box.style.backgroundColor = ""; // Réinitialise la couleur de fond
  });
}

/************************************************************/
/*                      Main Programm                      */
/**************************************************************/

window.addEventListener("DOMContentLoaded", function () {
  generateGrid();
  generateGridBtn.addEventListener("click", generateGrid);

  colorPickers.forEach((input) => {
    input.addEventListener("input", selectColor);
  });

  document.addEventListener("mousedown", colorOnCells);
  document.addEventListener("mouseup", stopColoring);

  clearBtn.addEventListener("click", clearPaintBoard);
});
