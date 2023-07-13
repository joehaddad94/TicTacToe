const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#current-player")
const startCells = ["","","","","","","","",""]

let crossScore = document.getElementById("player1-score")
let crossValue = parseInt(crossScore.textContent);
let circleScore = document.getElementById("player2-score")
let circleValue = parseInt(circleScore.textContent);

let restart_btn = document.getElementById("restart-button")
restart_btn.addEventListener("click", restartGame)

let reset_btn = document.getElementById("reset-score-btn")
reset_btn.addEventListener("click", resetScore)

let go = "cross"
infoDisplay.textContent = "Cross goes first"
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
    go = go === "cross" ? "circle" : "cross"
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
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            newScore = crossValue +1
            crossScore.textContent = newScore
            return
        }
    })

    winningCombos.forEach(array =>{
        let crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            newScore = circleValue +1
            circleScore.textContent = newScore
            return
        }
    })
}
 

function restartGame () {
    let allSquares = document.querySelectorAll('.square');
    console.log(allSquares)

    for (let i = 0; i < allSquares.length; i++) {
        allSquares[i].classList.remove('circle', 'cross');
    }
}

function resetScore () {
    crossValue = 0;
    circleValue = 0;
    crossScore.textContent = crossValue;
    circleScore.textContent = circleValue;
}