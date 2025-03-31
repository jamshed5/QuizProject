import { quizsData } from "./featchingApi/quizsData.js" 

// formating html
const displayQuizList = (quizArrayOfObjects) => {
  const quizBoxDiv = document.querySelector(".quizBoxDiv") 
  // clear previous content
  quizBoxDiv.innerHTML = "" 
  // use fragment (stop printing again and agin)
  const fragment = document.createDocumentFragment() 
  quizArrayOfObjects.forEach((item) => {
    const quizBoxItem = document.createElement("div") 
    quizBoxItem.setAttribute("class", "quizBoxItem") 
    // question and options
    const question = item.question 
    const options = item.options 
    quizBoxItem.innerHTML = `<h2>${question}</h2>` 
    const optionUnOrderList = document.createElement("ul") 
    options.forEach((option) => {
      const listItem = document.createElement("li") 
      listItem.innerHTML = option.text 
      optionUnOrderList.appendChild(listItem) 
    }) 
    const correctAnswerBtn = document.createElement("button") 
    correctAnswerBtn.setAttribute("type", "button") 
    correctAnswerBtn.innerText = "Show Correct Answer" 

    // display explanation
    const correctAnswerPara = document.createElement("p") 
    // .hidden set display non in css
    correctAnswerPara.classList.add("hidden") 
    // show answer
    correctAnswerBtn.addEventListener("click", () => {
      correctAnswerPara.classList.toggle("hidden") 
      correctAnswerBtn.innerText = correctAnswerPara.classList.contains(
        "hidden"
      )
        ? "Show Correct Answer"
        : "Hide Correct Answer" 
      correctAnswerPara.innerHTML = item.explanation 
    }) 

    quizBoxItem.appendChild(optionUnOrderList) 
    quizBoxItem.appendChild(correctAnswerBtn) 
    quizBoxItem.appendChild(correctAnswerPara) 
    fragment.appendChild(quizBoxItem) 
  }) 
  // append all elements at once (best performance) with fragment its a repaint
  quizBoxDiv.appendChild(fragment) 
} 

// message for no quizzes found
const showNotFoundMessage = (isVisible) => {
  const notFoundMessage = document.querySelector(".notFoundMessage") 
  if (isVisible) {
    notFoundMessage.innerHTML = "<p>No matching quizzes found</p>" 
    // show message
    notFoundMessage.style.display = "block" 
  } else {
    // hide message
    notFoundMessage.style.display = "none" 
  }
} 

// sort
const sortFilteredQuizzes = (filteredQuizzes, sortOrderDropdown) => {
  if (sortOrderDropdown) {
    const sortSelectedValue = sortOrderDropdown.value 
    // ascending order
    if (sortSelectedValue === "ascending") {
      console.log("Sorting in ascending order") 
      
      filteredQuizzes.sort((a, b) => {
        if (a.question < b.question) return -1 
        if (a.question > b.question) return 1 
        return 0 
      }) 
      console.log(filteredQuizzes)
    }
    // descending order
    else if (sortSelectedValue === "descending") {
      console.log("Sorting in descending order") 
      filteredQuizzes.sort((a, b) => {
        if (a.question > b.question) return -1 
        if (a.question < b.question) return 1 
        return 0 
      }) 
      console.log(filteredQuizzes)
    }
  }
} 

const quizList = (quizArrayOfObjects, inputField, sortOrderDropdown) => {
  // by default (all quizs)
  displayQuizList(quizArrayOfObjects) 
  // event on query
  inputField.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase() 
    // filter quizzes (inside global)
    let filteredQuizzes 

    filteredQuizzes = quizArrayOfObjects.filter((quiz) => {
      return quiz.question.toLowerCase().includes(query) 
    }) 

    // check length of filteredQuizzes
    if (filteredQuizzes.length === 0) {
      // show message not found
      showNotFoundMessage(true) 
    } else {
      // hide message if quizzes found
      showNotFoundMessage(false) 
    }

    // if query is empty (e.g user dont put)
    if (query === "") {
      // then copy all quizzes (copy)
      filteredQuizzes = quizArrayOfObjects 
    }

    // just only search (its only render quizzes)
    displayQuizList(filteredQuizzes) 

    // search with order by
    sortFilteredQuizzes(filteredQuizzes, sortOrderDropdown) 
  }) 

  // just only search (plus order by)
  if (sortOrderDropdown) {
    sortOrderDropdown.addEventListener("change", () => {
      const query = inputField.value.trim().toLowerCase() 
      let filteredQuizzes = quizArrayOfObjects.filter((quiz) =>
        quiz.question.toLowerCase().includes(query)
      ) 

      // filteredQuizzes (having all quizzes)
      sortFilteredQuizzes(filteredQuizzes, sortOrderDropdown) 

      // just only search (its only render quizzes)
      displayQuizList(filteredQuizzes) 

      if (filteredQuizzes.length === 0) {
        showNotFoundMessage(true) 
      } else {
        showNotFoundMessage(false) 
      }
    }) 
  }
} 

// named export 
export { quizList } 
