// querySelector variables
const gridContainer = document.querySelector(".gridContainer");

const resetGridBtn = document.querySelector(".resetGridBtn");
resetGridBtn.addEventListener("click", resetGrid);

const changeGridSizeBtn = document.querySelector(".changeGridSizeBtn");
changeGridSizeBtn.addEventListener("click", changeGridSize);

const blackModeBtn = document.querySelector(".blackModeBtn");
blackModeBtn.addEventListener("click", () => {
    blackMode = true;
    resetGrid();
});

const randomColorModeBtn = document.querySelector(".randomColorModeBtn");
randomColorModeBtn.addEventListener("click", () => {
    blackMode = false;
    resetGrid();
});

// global variables
let gridSize = 10;
let blackMode = true;

// functions
function resetGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    createGrid(gridSize);
};

function createGrid(gridSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridSize ** 2; i++) {
        let gridUnit = document.createElement("div");
        gridUnit.className += "gridUnit";
        gridUnit.style.filter = "brightness(100%)";
        gridContainer.appendChild(gridUnit);
    }
    changeGridUnitColor();
};

function changeGridSize() {
    gridSize = prompt("How many squares wide would you like the new grid?");
    resetGrid();
}

function changeGridUnitColor() {
    let gridUnits = document.querySelectorAll(".gridUnit");
    gridUnits.forEach(function(e) {
        e.addEventListener("mouseover", () => {
            if (blackMode) {
                e.style.backgroundColor = "black";
            }
            else {
                if (! e.style.backgroundColor) {
                    console.log(e.style.backgroundColor);
                    let randomColor = "#" + ((1<<24)*Math.random()|0).toString(16);
                    e.style.backgroundColor = randomColor;                  
                }
                else {
                    let brightness = parseInt(e.style.filter.match(/\d+/));
                    e.style.filter = `brightness(${brightness -10}%)`;
                }
            }
        })
    })
}

createGrid(gridSize);