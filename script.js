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
    //  let parentDiv = e.target
    // console.log(parentDiv)
    // let trackedIdExists = parentDiv.querySelector('#tracked') !== null;
    // console.log(trackedIdExists)
    // let idTracker = 'tracked'
    // goDisplay.id = idTracker
    // let trackedIdExists = parentDiv.querySelector('#tracked') !== null;
    // console.log(e.target)
    
    let goDisplay = document.createElement("div")
    e.target.append(goDisplay)
    goDisplay.classList.add(go)
     go = (go === "cross") ? "circle" : "cross";
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
        let crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            crossValue +=1
            crossScore.textContent = crossValue
            return
        }
    })

    winningCombos.forEach(array =>{
        let circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            circleValue += 1
            circleScore.textContent = circleValue
            return
        }
    })
}
 

function restartGame () {
    gameBoard.innerHTML = ''
    createBoard()
    // let allSquares = document.querySelectorAll('.square');
    // // console.log(allSquares)
    // let crossDiv= document.querySelectorAll('.cross')
    // let circleDiv= document.querySelectorAll('.circle')
      
    // for (let i = 0; i < crossDiv.length; i++) {
    //     crossDiv[i].classList.remove( 'cross');
    //     allSquares[i].removeChild
    // }

    // for (let i = 0; i < circleDiv.length; i++) {
    //     circleDiv[i].classList.remove( 'circle');
    //     circleDiv.remove
    //     // console.log(allSquares)
    // }

    // console.log(allSquares[0])
    // for (let i = 0; i < allSquares.length -1; i++) {
    //     console.log(i);
    //     allSquares[i].classList.remove('circle', 'cross');
    // }
}

function resetScore () {
    crossValue = 0;
    circleValue = 0;
    crossScore.textContent = crossValue;
    circleScore.textContent = circleValue;
}