// quizArrayOfObjects (global)
const quizArrayOfObjects = []


// menu bar 
const body = document.body
// menuDiv
const menuDiv = document.createElement("div")
menuDiv.setAttribute("id", "menuDiv")
body.prepend(menuDiv)
// menuDiv -> Buttons
const buttons = [
    { text: "Add Quiz", id: "addQuizBtn" },
    { text: "Quiz List", id: "quizListBtn" },
    { text: "Add Players & Run Competition", id: "addPlayersBtn" }
]
buttons.forEach(({ text, id }) => {
    const button = document.createElement("button")
    button.setAttribute("type", "button")
    button.setAttribute("id", id)
    button.innerHTML = text
    menuDiv.appendChild(button)
})


// create quiz object 
const createQuizObject = (question, option1, option2, option3, option4, correctAnswer) => {
    if (!question || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
        return "All fields are required."
    }
    // quiz object
    const quiz = { question, 
        options: [option1, option2, option3, option4], 
        correctAnswer }
    
        // push
    quizArrayOfObjects.push(quiz)
    return quiz
}
// reset input colors 
const validationResetColor = () => {
    document.querySelectorAll("#option1, #option2, #option3, #option4").forEach((input) => {
        input.style.backgroundColor = ""
    })
}
// Update option colors based on correct answer 
const updateOptionColors = (correctAnswer) => {
    correctAnswer = correctAnswer.trim().toLowerCase()
    const options = ["#option1", "#option2", "#option3", "#option4"].map((id) =>
        document.querySelector(id)
    )

    options.forEach((input) => {
        // getting all inputs value and matching
        const value = input.value.trim().toLowerCase()
        if (value === correctAnswer) {
            input.style.backgroundColor = "rgb(144, 238, 144)" // light green for correct answer
        } else if (value !== "") {
            input.style.backgroundColor = "rgb(255, 127, 127)" // light red for incorrect options
        } else {
            input.style.backgroundColor = "" // reset empty fields
        }
    })
}
// create (form) and add quiz 
let quizForm
const createAndAddQuiz = () => {
    const addQuizBtn = document.getElementById("addQuizBtn")
    addQuizBtn.addEventListener("click", () => {
        if (!quizForm) {
            // creating quiz form
            const scriptTag = document.querySelector("script")
            quizForm = document.createElement("form")
            quizForm.setAttribute("id", "quizForm")

            // error message
            const error = document.createElement("div")
            error.setAttribute("id", "error")
            error.style.color = "white"
            error.style.backgroundColor="red"
            quizForm.appendChild(error)

            // create from fields label and inputs
            const fields = [
                { label: "Question:", id: "question" },
                { label: "Option 1:", id: "option1" },
                { label: "Option 2:", id: "option2" },
                { label: "Option 3:", id: "option3" },
                { label: "Option 4:", id: "option4" },
                { label: "Correct Answer:", id: "correctAnswer" }
            ]

            fields.forEach(({ label, id }) => {
                const labelElement = document.createElement("label")
                labelElement.setAttribute("for", id)
                labelElement.innerHTML = label

                const inputElement = document.createElement("input")
                inputElement.setAttribute("type", "text")
                inputElement.setAttribute("id", id)
                inputElement.setAttribute("name", id)
                inputElement.setAttribute("required", "")

                quizForm.appendChild(labelElement)
                quizForm.appendChild(inputElement)
            })

            // add quiz button (submit)
            const submitQuizBtn = document.createElement("button")
            submitQuizBtn.setAttribute("type", "submit")
            submitQuizBtn.setAttribute("id", "submitQuizBtn")
            submitQuizBtn.innerHTML = "Add Quiz"
            quizForm.appendChild(submitQuizBtn)

            // adding form before script tag
            body.insertBefore(quizForm, scriptTag)
            quizForm.style.display = "flex"
            // change name hide
            addQuizBtn.innerHTML = "Hide Quiz Form"

                // submit form
                quizForm.addEventListener("submit", (event) => {
                    event.preventDefault()

                    // getting values 
                    const question = document.querySelector("#question").value.trim()
                    const option1 = document.querySelector("#option1").value.trim()
                    const option2 = document.querySelector("#option2").value.trim()
                    const option3 = document.querySelector("#option3").value.trim()
                    const option4 = document.querySelector("#option4").value.trim()
                    const correctAnswer = document.querySelector("#correctAnswer").value.trim()
                    
                    // for unique options using set
                    let uniqueOptions = new Set([option1, option2, option3, option4])
                    error.innerText = ""

                    if (uniqueOptions.size === 4) {
                        // call createQuizObject()
                        let result = createQuizObject(question, option1, option2, option3, option4, correctAnswer)
                        if (typeof result === "string") {
                            error.innerText = result
                        } else {
                            // if sucessfull its mean have quiz object
                            // reset quiz form
                            quizForm.reset()
                            // reset validation colors
                            validationResetColor()
                            console.log("quizArrayOfObjects:", quizArrayOfObjects)
                        }
                    } else {
                        // not unique 
                        error.innerText = "Error: Need unique options (cannot submit)"
                    }
                })

            // validation and coloring
            quizForm.addEventListener("input", (event) => {
                if (event.target.id === "correctAnswer") {
                    // call updateOptionColors() and passing value of input for matching case
                    updateOptionColors(event.target.value)
                }
            })

        } else {
            // toggle (show and hide quiz form)
            if (quizForm.style.display === "none" || quizForm.style.display === "") {
                quizForm.style.display = "flex"
                addQuizBtn.innerHTML = "Hide Quiz Form"
            } else {
                quizForm.style.display = "none"
                addQuizBtn.innerHTML = "Add Quiz"
            }
            
        }
    })
}


// show quiz list 
const quizList = () => {
    const listOfQuizBtn = document.getElementById("quizListBtn")
    listOfQuizBtn.addEventListener("click", () => {
        
        //  at now listOfQuiz null
        let listOfQuiz = document.getElementById("listOfQuiz")
        
        // hide the quiz form if it's open
        if (quizForm) {
            quizForm.style.display = "none"
            addQuizBtn.innerHTML = "Add Quiz" // reset add quiz button text
        }

        // if listOfQuiz doesn't exist, create it
        if (!listOfQuiz) {
            listOfQuiz = document.createElement("div")
            listOfQuiz.setAttribute("id", "listOfQuiz")
            body.appendChild(listOfQuiz)
        }

        // toggle
        if (listOfQuiz.style.display === "none" || listOfQuiz.innerHTML === "") {
            listOfQuiz.style.display = "block" // show quiz list
            listOfQuizBtn.innerHTML = "Hide Quiz List" // change button text
        } else {
            listOfQuiz.style.display = "none" // hide quiz list
            listOfQuizBtn.innerHTML = "Quiz List" // reset button text
            return // exit function early
        }

        // clear previous content
        listOfQuiz.innerHTML = ""

        if (quizArrayOfObjects.length === 0) {
            const noQuizMessage = document.createElement("h3")
            noQuizMessage.innerText = "No quizzes available."
            listOfQuiz.appendChild(noQuizMessage)
        } else {
            quizArrayOfObjects.forEach((quiz, index) => {
                console.log(index)
                const quizContainer = document.createElement("div")

                // question header
                const questionHeader = document.createElement("h4")
                questionHeader.innerText = quiz.question
                quizContainer.appendChild(questionHeader)

                // options list
                const optionsList = document.createElement("ul")
                quiz.options.forEach(option => {
                    const optionItem = document.createElement("li")
                    optionItem.innerText = option
                    optionsList.appendChild(optionItem)
                })

                // button to check correct answer
                const correctAnswerBtn = document.createElement("button")
                correctAnswerBtn.setAttribute("id", `checkAnswerBtn-${index}`)
                correctAnswerBtn.innerText = "Check Correct"
                optionsList.appendChild(correctAnswerBtn)

                // display correct answer on click
                correctAnswerBtn.addEventListener("click", () => {
                    const correctAnswerMessage = document.createElement("p")
                    correctAnswerMessage.innerText = `Correct Answer: ${quiz.correctAnswer}`
                    optionsList.appendChild(correctAnswerMessage)
                    correctAnswerBtn.disabled = true
                })

                quizContainer.appendChild(optionsList)

                // add underline using <hr>
                const separator = document.createElement("hr")
                separator.style.margin = "10px 0" // add spacing
                quizContainer.appendChild(separator)

                listOfQuiz.appendChild(quizContainer)
            })
        }
    })
}


// function to announce the winner using voice
const announceWinner = (message) => {
    const speech = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(speech)
}
// function to find the winner
const getWinner = (players) => {
    const maxScore = Math.max(...players.map(p => p.score))
    const winners = players.filter(p => p.score === maxScore)
    return winners.length > 1 ? "It's a tie!" : `The winner is ${winners[0].playerName} with ${winners[0].score} points!`
}
// Render quiz function for each player 
const renderQuiz = (player, callback) => {
    const fm = document.createElement("form")
    
    quizArrayOfObjects.forEach((quiz, index) => {
        const h2 = document.createElement("h2")
        h2.innerText = quiz.question
        fm.appendChild(h2)

        const ul = document.createElement("ul")
        quiz.options.forEach(option => {
            const li = document.createElement("li")

            const input = document.createElement("input")
            input.setAttribute("type", "radio")
            input.setAttribute("name", `quiz-${index}`) // ensure radio buttons are grouped by question
            input.setAttribute("value", option)

            const label = document.createElement("label")
            label.innerText = option

            li.appendChild(input)
            li.appendChild(label)
            ul.appendChild(li)
        })

        fm.appendChild(ul)
    })

    // submit
    const submitBtn= document.createElement("button")
    submitBtn.setAttribute("type", "submit")
    submitBtn.innerText = "Submit Quiz"
    fm.appendChild(submitBtn)

    document.body.appendChild(fm)

    // handle form submission
    fm.addEventListener("submit", (event) => {
        event.preventDefault()

        let score = 0
        quizArrayOfObjects.forEach((quiz, index) => {
            const selectedOption = document.querySelector(`input[name="quiz-${index}"]:checked`)
            if (selectedOption && selectedOption.value === quiz.correctAnswer) {
                score++
            }
        })

        // update players score
        player.score += score
        console.log(`${player.playerName} scored: ${score}`)

        // remove form
        fm.remove()

        // move to next player
        callback()
    })
}
// add players and run competition 
const addPlayersAndRunCompetition = () => {

    const addPlayerbtn = document.getElementById("addPlayersBtn")
    addPlayerbtn.addEventListener("click", () => {
        addPlayerbtn.disabled=true
        // create form
        const playersForm = document.createElement("div")
        playersForm.setAttribute("id", "playersForm")
        
        // input for player 1
        const inputPlayer1 = document.createElement("input")
        inputPlayer1.setAttribute("type", "text")
        inputPlayer1.setAttribute("placeholder", "Enter Player 1 Name")
        inputPlayer1.setAttribute("id", "player1")
        inputPlayer1.setAttribute("name", "player1")
        inputPlayer1.required = true

        // input for player 2
        const inputPlayer2 = document.createElement("input")
        inputPlayer2.setAttribute("type", "text")
        inputPlayer2.setAttribute("placeholder", "Enter Player 2 Name")
        inputPlayer2.setAttribute("id", "player2")
        inputPlayer2.setAttribute("name", "player2")
        inputPlayer2.required = true

        // submit Button
        const submitPlayer = document.createElement("input")
        submitPlayer.setAttribute("type", "submit")
        submitPlayer.setAttribute("value", "Start Game")

        // append
        const fm = document.createElement("form")
        fm.appendChild(inputPlayer1)
        fm.appendChild(inputPlayer2)
        fm.appendChild(submitPlayer)
        playersForm.appendChild(fm)
        body.appendChild(playersForm) 

        // hide the quiz form if it's open
        if (quizForm) {
            // console.log(quizForm) 
            quizForm.style.display = "none"
            addQuizBtn.innerHTML = "Add Quiz" // reset add quiz button text
        }

        // submit
        fm.addEventListener("submit", (event) => {
            event.preventDefault()
            submitPlayer.disabled = true

            const player1 = inputPlayer1.value.trim()
            const player2 = inputPlayer2.value.trim()

            const players = [
                { playerName: player1, score: 0 },
                { playerName: player2, score: 0 }
            ]

            let currentPlayerIndex = 0

            const nextPlayer = () => {
                // show current player and previous player information
                const currentPlayer = document.createElement("div")
                currentPlayer.innerHTML = `<h2>Current Player: ${players[currentPlayerIndex].playerName}</h2>`
                body.appendChild(currentPlayer)

                    if (currentPlayerIndex > 0) {
                        const previousPlayer = document.createElement("div")
                        previousPlayer.innerHTML = `<h3>Previous Player: ${players[currentPlayerIndex - 1].playerName}</h3>`
                        body.appendChild(previousPlayer)
                    }
                // render quiz
                renderQuiz(players[currentPlayerIndex], () => {
                    currentPlayerIndex++
                    if (currentPlayerIndex < players.length) {
                        currentPlayer.remove() // remove current player info
                        // console.log(currentPlayerIndex) get increment
                        nextPlayer() // go to the next player
                    } else {
                        // game Over - show all players & scores
                        const scoresDisplay = document.createElement("div")
                        scoresDisplay.innerHTML = "<h2>Game Over! Final Scores:</h2>"
                        
                        // display results or stats
                        players.forEach((player) => {
                            const playerInfo = document.createElement("div")
                            playerInfo.innerHTML = `<h3>${player.playerName}: ${player.score}</h3>`
                            scoresDisplay.appendChild(playerInfo)
                        })
                        
                        body.appendChild(scoresDisplay)
                        
                        // enable
                        addPlayerbtn.disabled=false

                        // winner decision
                        const winner = getWinner(players)
                        announceWinner(winner)

                        // Clean up
                        playersForm.innerHTML = ""
                    }
                })
            }
            nextPlayer() // start the game
           
        })
    })
}


// search and records
const quizSearch = () => {
    const inputField = document.createElement("input")
    inputField.setAttribute("type", "text")
    inputField.setAttribute("id", "searchInput")
    inputField.setAttribute("placeholder", "Search Quiz...")

    // div
    const searchResults = document.createElement("div")
    searchResults.setAttribute("id", "searchResults")
    body.insertBefore(searchResults, menuDiv.nextSibling) // place search results below the menu

    // add input field below the menuDiv
    menuDiv.appendChild(inputField)

    inputField.addEventListener("input", (event) => {
        const query = event.target.value.trim().toLowerCase()
        searchResults.innerHTML = "" // clear previous results

            // hide search results if query is empty
            if (query === "") {
                searchResults.style.display = "none" 
                return // exit the function early
            } else {
                searchResults.style.display = "block" // show search results
            }

        let found = false

        quizArrayOfObjects.forEach((quiz) => {
            if (quiz.question.toLowerCase().includes(query)) {
                found = true

                const quizContainer = document.createElement("div")

                // highlight matching part
                const highlightedQuestion = quiz.question.replace(new RegExp(query, "gi"), (match) => `<mark>${match}</mark>`)

                const questionHeader = document.createElement("h4")
                questionHeader.innerHTML = highlightedQuestion
                quizContainer.appendChild(questionHeader)

                // Create list of options
                const optionsList = document.createElement("ul")
                quiz.options.forEach(option => {
                    const optionItem = document.createElement("li")
                    optionItem.innerText = option
                    optionsList.appendChild(optionItem)
                })

                quizContainer.appendChild(optionsList)
                searchResults.appendChild(quizContainer)

                // Add underline using <hr>
                const separator = document.createElement("hr")
                separator.style.margin = "10px 0" // add spacing
                searchResults.appendChild(separator) // append separator after each quiz
            }
        })

        if (!found) {
            searchResults.innerHTML = "<h3>No matching quizzes found.</h3>"
        }
    })
}


// main program
createAndAddQuiz()
quizList()
addPlayersAndRunCompetition()
quizSearch()
