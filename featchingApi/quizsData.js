// fetching api
const quizsData = () => {
  return fetch(
    "https://raw.githubusercontent.com/jamshed5/jamshed.quizapi.io/main/quizsdata/quizs.json"
  )
    .then((response) => {
      // check 201 ok or not
      if (!response.ok) {
        throw new Error(`http status: ${response.status}`) 
      }
      return response.json() 
    })
    .catch((error) => {
      console.error("error:", error) 
      throw error 
    }) 
} 

export { quizsData } 
