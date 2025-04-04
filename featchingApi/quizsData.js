// fetch data
const quizsData=async ()=>{
    try{
        const response=await fetch("https://raw.githubusercontent.com/jamshed5/jamshed.quizapi.io/main/quizsdata/quizs.json")
        // if response is not 200 ok 
        if(!response.ok){
          throw new Error(`http status: ${response.status}`)
        }
        
        // console.log(response.status)
        // wait for json conversion
        const data=await response.json()
        return data

     }
    catch(error){
      console.log("failed to fetch quiz data", error.message)
      // return empty 
      return [];  
    }
}

// named export 
export {quizsData}

