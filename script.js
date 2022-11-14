const box = document.querySelectorAll(".box")
const gameText = document.querySelector(".game-text")
const resetButton = document.querySelector(".game-reset")

let grid = [
            ["","",""],
            ["","",""],
            ["","",""],
            ]

// 50% chance to get either X or 0
let choice = Math.random() <= .5 ? "X" : "O" 
let clicked // a variable to hold the state of box (clicked or not)

box.forEach((e, index) => {
  e.clicked = false // initialize the stateof all the buttons
  e.addEventListener('click', () => { // add a smurf to each box
    if (e.clicked === false) { // check if the box is uncklicked
      e.clicked = true // when clicked => change button state to clicked
      // check if the box has not a class 'not-allowed' , see css
      // this will prevent to click twice on a box
      if (getComputedStyle(box[index]).pointer !== 'not-allowed') {
        e.classList.add("not-allowed") // add 'not-allowed' class to a clicked box  
        grid[Math.floor(index / 3)][index % 3] = choice // put choice on grid array
        e.innerHTML = choice // put choice on screen
        console.log(grid) // print grid of choice on console
        // check if there is a winner
        grid.forEach((e, index) => {
          let rowContent = e.join("") // get the row values
          let columnContent = grid.map(row => row[index]).join(""); // get col values
          // get the diagonal values
          let diagonalLeft  = `${grid[0][0]}${grid[1][1]}${grid[2][2]}`
          let diagonalRight = `${grid[0][2]}${grid[1][1]}${grid[2][0]}`
     
          // console.log('row'   , rowContent)
          // console.log('col'   , columnContent)
          // console.log('xRowWin'  ,rowContent.includes("X".repeat(3)))
          // console.log('xColWin'  ,columnContent.includes("X".repeat(3)))
          // console.log("==")
          
          // console.log('Dleft' , diagonalLeft)
          // console.log('DRight', diagonalRight)
          // console.log('xDiagLWin',diagonalLeft.includes("X".repeat(3)))
          // console.log('xDiagRWin',diagonalRight.includes("X".repeat(3)))
          
          // check the wining state
          checkWinning(rowContent)
          checkWinning(columnContent)
          checkWinning(diagonalLeft)
          checkWinning(diagonalRight)
        })
      }
      choice = choice === "X" ? "O" : "X"; // switch the choice after each click
    }
  })
})
// the reset button
resetButton.addEventListener('click', () => {
  choice = choice === "X" ? "O" : "X"; 
  box.forEach((e, i)=> {
    box[i].innerHTML = "" // empty the boxes
    e.clicked = false     // change the state of the button to not clicked
    e.classList.remove("not-allowed") // remove 'not-allowed' class from clicked boxes  
  })
  grid.forEach((e,i) => {
    grid[i].forEach((f,j) => grid[i][j]="") // empty the grid array
  })
  gameText.innerHTML = "" // empty the result
  console.clear()   // clear the console
  console.log(grid) // show the empty grid
})
// cheking Function
function checkWinning(n) {
  let msg = ""
  if (n.includes("X".repeat(3))) { 
    msg = "Player X wins"
    gameText.innerHTML = msg
    console.log(msg);
  } else if (n.includes("O".repeat(3))) {inn
    msg = "Player O wins"
    gameText.innerHTML = msg
    console.log(msg);
  }
}