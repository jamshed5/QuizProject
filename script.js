// quizArrayOfObjects (global)
const quizArrayOfObjects = []


// generate quiz btn true/false 
const GenerateQuizbtn = () => {
    const generateQuizButton = document.getElementById("generateQuiz")
    generateQuizButton.disabled = quizArrayOfObjects.length === 0 // set true/false
}


// validations for options and correct answer
const ValidationAndColor=()=>{
    // for color
    document.addEventListener("DOMContentLoaded", () => {
        // get inputs
        const correctAnswer = document.querySelector("#correctAnswer")
        const option1Input = document.querySelector("#option1")
        const option2Input = document.querySelector("#option2")
        const option3Input = document.querySelector("#option3")
        const option4Input = document.querySelector("#option4")
    
        correctAnswer.addEventListener("input", (event) => {
            // get values
            const correctAnswerValue = event.target.value.trim().toLowerCase()
            const option1 = option1Input.value.trim().toLowerCase()
            const option2 = option2Input.value.trim().toLowerCase()
            const option3 = option3Input.value.trim().toLowerCase()
            const option4 = option4Input.value.trim().toLowerCase()
    
            //  allInputs array
            const allInputs = [option1Input, option2Input, option3Input, option4Input]
    
            // reset colors 
            allInputs.forEach(input => {
                input.style.backgroundColor = ""
            })
    
            // matching and setting correct answer color
            // rgb(144, 238, 144) green
            if (correctAnswerValue === option1) {
                option1Input.style.backgroundColor = "rgb(144, 238, 144)" 
            } 
            if (correctAnswerValue === option2) {
                option2Input.style.backgroundColor = "rgb(144, 238, 144)" 
            } 
            if (correctAnswerValue === option3) {
                option3Input.style.backgroundColor = "rgb(144, 238, 144)" 
            } 
            if (correctAnswerValue === option4) {
                option4Input.style.backgroundColor = "rgb(144, 238, 144)" 
            }
    
            // set light red for incorrect options
            allInputs.forEach(input => {
                //light red incorrect answer and empty case
                // its loop value geting using input.value.trim().toLowerCase()
                const inputValue = input.value.trim().toLowerCase()
                if (inputValue !== correctAnswerValue && inputValue !== "") {
                    // light red for incorrect answers
                    input.style.backgroundColor = "rgb(255, 127, 127)" 
                }
            })
        })
    })
}


// reset color for inputs 
let validationResetColor=()=>{
        const correctAnswer = document.querySelector("#correctAnswer")
        const option1Input = document.querySelector("#option1")
        const option2Input = document.querySelector("#option2")
        const option3Input = document.querySelector("#option3")
        const option4Input = document.querySelector("#option4")
        option1Input.style.backgroundColor=""
        option2Input.style.backgroundColor=""
        option3Input.style.backgroundColor=""
        option4Input.style.backgroundColor=""      
}


// create quiz object
let createQuizObject = (question, option1, option2, option3, option4, correctAnswer) => {
    let exist = quizArrayOfObjects.some((q) => {
        return q.question === question
    })

    if (exist) {
        let message
        message = `Your question: [${question}] already exists`
        return message
    } else {
        // Create the quiz object
        const quizQuestion = {
            id: quizArrayOfObjects.length + 1,
            question: question,
            options: [],
            explanation: `The correct answer is ${correctAnswer}`
        }
        // Push options into the quiz object
        let all_options = [option1, option2, option3, option4]
        all_options.forEach(option => {
            quizQuestion.options.push({
                text: option,
                isCorrect: option === correctAnswer // set (true/false)
            })
        })
        // Push to the array
        quizArrayOfObjects.push(quizQuestion)
        return quizArrayOfObjects
    }
}


// render quiz 
const renderQuiz = () => {
    document.body.innerHTML=""
    const fm = document.createElement("form")
    fm.setAttribute("method", "post")

    quizArrayOfObjects.forEach(quiz => {
        const h2 = document.createElement("h2")
        h2.innerText = quiz.question
        fm.appendChild(h2)

        const ul = document.createElement("ul")
        quiz.options.forEach(option => {
            const li = document.createElement("li")

            const input = document.createElement("input")
            input.setAttribute("type", "radio")
            input.setAttribute("id", option.text)
            input.setAttribute("name", `quiz-${quiz.id}`)
            input.setAttribute("value", option.text)

            const label = document.createElement("label")
            label.setAttribute("for", option.text)
            label.innerText = option.text

            li.appendChild(input)
            li.appendChild(label)
            ul.appendChild(li)
        })

        fm.appendChild(ul)
    })

    // Create submit quiz button 
    const submitButton = document.createElement("button")
    submitButton.setAttribute("type", "submit")
    submitButton.innerText = "Submit Quiz"
    fm.appendChild(submitButton)

    // Handle form submission
    fm.addEventListener("submit", (event) => {
        event.preventDefault()

        // Get selected answers
        let answers = {}
        quizArrayOfObjects.forEach(quiz => {
            const selectedOption = document.querySelector(`input[name="quiz-${quiz.id}"]:checked`)
            answers[quiz.id] = selectedOption ? selectedOption.value : "not selected"
        })

        // Log answers
        console.log("User Answers:", answers)
        alert("See console for answers object")
    })

    document.body.appendChild(fm)
}

// quizList
const quizList=()=>{
    // list of quiz
    const listOfQuizButton = document.getElementById("quizList")
    listOfQuizButton.addEventListener("click", (event) => {
    const listOfQuiz = document.getElementById("listOfQuiz")

    // clear previous content
    listOfQuiz.innerHTML = ""

    // Check if quizzes exist
    if (quizArrayOfObjects.length === 0) {
        const noQuizMessage = document.createElement("h3")
        noQuizMessage.innerText = "No quizzes available."
        listOfQuiz.appendChild(noQuizMessage)
    } else {
        // loop through the quizArrayOfObjects and create lists for each quiz
        quizArrayOfObjects.forEach(quiz => {
            const quizContainer = document.createElement("div")

            // create h4
            const questionHeader = document.createElement("h4")
            questionHeader.innerText = quiz.question
            quizContainer.appendChild(questionHeader)

            // create ul
            const optionsList = document.createElement("ul")

            // create li
            quiz.options.forEach(option => {
                const optionItem = document.createElement("li")
                // set option text (loop)
                optionItem.innerText = option.text 
                optionsList.appendChild(optionItem)
               
                
            })
           
                const correctAnswerbtn=document.createElement("button")
                correctAnswerbtn.setAttribute("id",quiz.id)
                correctAnswerbtn.setAttribute("value",quiz.explanation)
                correctAnswerbtn.innerText="check correct"
                optionsList.appendChild(correctAnswerbtn)
                // check explanation
                correctAnswerbtn.addEventListener("click",(event)=>{
                    const p=document.createElement("p")
                    p.innerText=quiz.explanation
                    optionsList.append(p)
                    correctAnswerbtn.disabled=true

                })
            quizContainer.appendChild(optionsList)
            listOfQuiz.appendChild(quizContainer)
        })
    }
})
}

// Main 
GenerateQuizbtn() 
// validation
ValidationAndColor()
// submit
const fm = document.getElementById("quizForm")
fm.addEventListener("submit", (event) => {
    event.preventDefault()
    const question = document.querySelector("#question").value
    const option1 = document.querySelector("#option1").value
    const option2 = document.querySelector("#option2").value
    const option3 = document.querySelector("#option3").value
    const option4 = document.querySelector("#option4").value
    const correctAnswer = document.querySelector("#correctAnswer").value

    // Check for unique options
    let uniqueOptions = new Set([option1, option2, option3, option4])
    // error
    const error = document.getElementById("error")
    error.innerText=""
    if (uniqueOptions.size === 4) {
        let result = createQuizObject(question, option1, option2, option3, option4, correctAnswer)
        if (typeof(result) === "string") {
            console.log(result)
        } else {
            // reset values
            document.querySelector("#question").value = ""
            document.querySelector("#option1").value = ""
            document.querySelector("#option2").value = ""
            document.querySelector("#option3").value = ""
            document.querySelector("#option4").value = ""
            document.querySelector("#correctAnswer").value = ""

            console.log("quizArrayOfObjects:", quizArrayOfObjects)
            const quizLength = quizArrayOfObjects.length
            let quizCountsTagSpan = document.getElementById("quizCounts")
            if (quizCountsTagSpan) {
                quizCountsTagSpan.innerText = quizLength
                // enable generate quiz button
                GenerateQuizbtn() 
                // reset color for the inputs
                validationResetColor()
            }
        }
    } else {
       
        error.innerText="Error: need unique options (cannot submit)"
        return error
    }
})


// generate quiz button after click disable
const generateQuizButton = document.getElementById("generateQuiz")
generateQuizButton.addEventListener("click", (event) => {
    if (quizArrayOfObjects.length > 0) {
        renderQuiz() // Rendering quiz
        generateQuizButton.disabled = true // Disable button after generating
    }    
})

// show list
quizList()







