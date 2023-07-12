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
    checkScore()
}

function checkScore(){
    let allSquares = document.querySelectorAll(".square")
    let winningCombos =[
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    winningCombos.forEach(array =>{
        let circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    winningCombos.forEach(array =>{
        let crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}