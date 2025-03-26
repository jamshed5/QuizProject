// imports
import { quizsData } from "./featchingApi/quizsData.js"
import { quizList } from "./quizlist.js"
import { addPlayersAndRunCompetition } from "./addPlayersAndRunCompetition.js"

// setting global quizArrayOfObjects
let quizArrayOfObjects

// check page
if (document.title.includes("Quiz App")) {
    console.log("page = all Quiz")
    // fetch data
    quizsData()
        .then((fetchData) => {
            quizArrayOfObjects = fetchData

            // catching search and filter
            const inputField = document.querySelector(".inputQuery")
            const sortOrderDropdown = document.getElementById("sortOrder")

            // passing and calling
            quizList(quizArrayOfObjects, inputField, sortOrderDropdown)
        })
} else if (document.title.includes("Add Players & Run Competition")) {
    console.log("page = Add Players & Run Competition")
    // fetch data
    quizsData()
        .then((fetchData) => {
            quizArrayOfObjects = fetchData

            // catching search and filter
            const player1Input = document.querySelector(".player1")
            const player2Input = document.querySelector(".player2")

            // passing and calling
            addPlayersAndRunCompetition(quizArrayOfObjects, player1Input, player2Input)
        })
}
