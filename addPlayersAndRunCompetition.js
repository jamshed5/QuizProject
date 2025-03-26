// winner announcement
const announceWinner = (message) => {
    const speech = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(speech)
}

// find winner
const getWinner = (players) => {
    const maxScore = Math.max(...players.map(p => p.score))
    const winners = players.filter(p => p.score === maxScore)
    return winners.length > 1 ? "It's a tie!" : `The winner is ${winners[0].playerName} with ${winners[0].score} points!`
}

// render quiz for each player 
const renderQuiz = (quizArrayOfObjects, player, callback) => {
    const playerField=document.querySelector(".playerField")
    const quizForm = document.createElement("form")

    quizArrayOfObjects.forEach((quiz, index) => {
        const questionElement = document.createElement("h2")
        questionElement.innerText = quiz.question
        quizForm.appendChild(questionElement)

        const optionsList = document.createElement("ul")
        optionsList.className = "optionsList"

        quiz.options.forEach(option => {
            const listItem = document.createElement("li")
            const input = document.createElement("input")

            input.setAttribute("type", "radio")
            // name using index
            input.setAttribute("name", `quiz-${index}`) 
            // option text
            input.setAttribute("value", option.text) 

            const label = document.createElement("label")
            // use option text for unique ID
            label.setAttribute("for", `quiz-${index}-${option.text}`)
            // display the option text 
            label.innerText = option.text 

            listItem.appendChild(input)
            listItem.appendChild(label)
            optionsList.appendChild(listItem)
        })

        quizForm.appendChild(optionsList)
 
    })

    // submit button
    const submitBtn = document.createElement("button")
    submitBtn.setAttribute("type", "submit")
    submitBtn.setAttribute("class", "playerSubmit")
    
    submitBtn.innerText = "Submit Quiz"
    quizForm.appendChild(submitBtn)

    playerField.appendChild(quizForm)

    // event
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault()

        let score = 0
        quizArrayOfObjects.forEach((quiz, index) => {
            const selectedOption = document.querySelector(`input[name="quiz-${index}"]:checked`)
            const selectedValue = selectedOption ? selectedOption.value : null
            const correctOption = quiz.options.find(option => option.isCorrect)

            if (selectedValue === correctOption.text) {
                score++
            }
        })

        // update player's score
        player.score += score
        console.log(`${player.playerName} scored: ${score}`)

        // remove form
        quizForm.remove()

        // move to next player
        callback()
    })
}

// add players and run competition 
const addPlayersAndRunCompetition = (quizArrayOfObjects, player1Input, player2Input) => {
    const playersForm = document.querySelector("#playersForm")
    const submitPlayer = document.querySelector(".submitPlayer")

    // event playerFrom 
    playersForm.addEventListener("submit", (event) => {
        event.preventDefault()
        submitPlayer.disabled = true
        // getting players
        const player1 = player1Input.value.trim()
        const player2 = player2Input.value.trim()

        if (player1 === player2) {
            alert("Player names must be unique. Please enter different names.")
            // enable the button again for re-entry
            submitPlayer.disabled = false 
            return
        }
        // players object
        const players = [
            { playerName: player1, score: 0 },
            { playerName: player2, score: 0 }
        ]

        let currentPlayerIndex = 0

        const nextPlayer = () => {
            // displaying current player information
            const playerField=document.querySelector(".playerField")
            const currentPlayerDiv = document.createElement("div")
            currentPlayerDiv.innerHTML = `<h2>Current Player: <b class='playerNameStyle'>${players[currentPlayerIndex].playerName}</b></h2>`
           
            

            playerField.appendChild(currentPlayerDiv)
           

            if (currentPlayerIndex > 0) {
                const previousPlayerDiv = document.createElement("div")
                previousPlayerDiv.innerHTML = `<h3>Previous Player: ${players[currentPlayerIndex - 1].playerName}</h3>`
                playerField.appendChild(previousPlayerDiv)
            }

            // render quiz
            renderQuiz(quizArrayOfObjects, players[currentPlayerIndex], () => {
                currentPlayerIndex++
                // remove current player info
                currentPlayerDiv.remove() 

                if (currentPlayerIndex < players.length) {
                    // go to the next player
                    nextPlayer() 
                } else {
                   
                    const playerInputContainer=document.querySelector(".playerInputContainer")
                    playerInputContainer.style.display = "none";
                    
                    
                    // game over - show all players & scores
                    const scoresDisplay = document.createElement("div")
                    scoresDisplay.innerHTML = "<h2>Game Over! Final Scores:</h2>"
                    
                    // display results
                    players.forEach((player) => {
                        const playerInfo = document.createElement("div")
                        playerInfo.innerHTML = `<h3>${player.playerName}: ${player.score}</h3>`
                        scoresDisplay.appendChild(playerInfo)
                    })
                    
                    playerField.appendChild(scoresDisplay)
                    
                    // enable the add player button
                    submitPlayer.disabled = false

                    // get the winner
                    const winner = getWinner(players)
                    announceWinner(winner)

                    // clean up
                    playersForm.innerHTML = ""
                }
            })
        }
        // start the game
        nextPlayer() 
    })
}

// named export 
export { addPlayersAndRunCompetition }
