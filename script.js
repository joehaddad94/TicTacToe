const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#current-player")
const startCells = ["","","","","","","","",""]

let go = "circle"
infoDisplay.textContent = "Circle goes first"
function createBoard() {
    for (let index = 0; index < startCells.length; index++) {
      let cellElement = document.createElement("div");
      cellElement.classList.add("square");
      cellElement.id = index;
      cellElement.addEventListener('click', addGo)
      gameBoard.append(cellElement);
    }
  }
  
createBoard()

function addGo(e) {
    let goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go + "'s Turn."
    e.target.removeEventListener("click", addGo)
}
