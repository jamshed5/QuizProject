// Imports
import { quizsData } from "./featchingApi/quizsData.js" 
import { quizList } from "./quizlist.js" 
import { addPlayersAndRunCompetition } from "./addPlayersAndRunCompetition.js" 

// Get page link
let pathName = window.location.pathname 

// testing async behaviou 
// console.log("statement - 1") 

// fetch quiz data without awaiting
quizsData().then((quizArrayOfObjects) => {
   
    // console.log("fetched data:", quizArrayOfObjects)

    if (quizArrayOfObjects.length > 0) {
        if (pathName.includes("index.html") || pathName === "/") {

            // catching search and filter element
            const inputField = document.querySelector(".inputQuery") 
            const sortOrderDropdown = document.getElementById("sortOrder") 
            
            // calling
            quizList(quizArrayOfObjects, inputField, sortOrderDropdown) 

        } else if (pathName.includes("/players.html")) {
             // catching players
            const player1Input = document.querySelector(".player1") 
            const player2Input = document.querySelector(".player2") 
            
            // calling
            addPlayersAndRunCompetition(quizArrayOfObjects, player1Input, player2Input) 
        }
    } else {
        console.log("Failed to fetch quiz data or data is empty") 
    }


}).catch((error) => {
    console.error("Error fetching quiz data:", error) 
}) 
    
// console.log("statement - 2") 
// console.log("statement - 3") 

