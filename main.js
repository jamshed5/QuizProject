// Imports
import { quizsData } from "./featchingApi/quizsData.js" 
import { quizList } from "./quizlist.js" 
import { addPlayersAndRunCompetition } from "./addPlayersAndRunCompetition.js" 

// page link
let pathName = window.location.pathname 

// testing async behavior
console.log("statement - 1") 

async function fetchAndMainDecision() {
  try {
    // assign when data is available
    const quizArrayOfObjects = await quizsData() 

    // test async behavior (promises)
    console.log(quizArrayOfObjects)

    // quizArrayOfObjects is 0 or not exist
    if (!quizArrayOfObjects || quizArrayOfObjects.length === 0) {
      console.log("no data found or empty data") 
      return 
    }

    if (pathName.includes("index.html") || pathName === "/") {
      // catching search and filter elements
      const inputField = document.querySelector(".inputQuery") 
      const sortOrderDropdown = document.getElementById("sortOrder") 
      // call and passing parameters
      quizList(quizArrayOfObjects, inputField, sortOrderDropdown) 
    } else if (pathName.includes("/players.html")) {
      // catching players
      const player1Input = document.querySelector(".player1") 
      const player2Input = document.querySelector(".player2") 
      // call and passing parameters
      addPlayersAndRunCompetition(
        quizArrayOfObjects,
        player1Input,
        player2Input
      ) 
    }
  } catch (error) {
    console.error("error fetching quiz data:", error) 
  }
}

// call async function
fetchAndMainDecision() 

console.log("statement - 2") 
console.log("statement - 3") 
