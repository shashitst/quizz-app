import React, { useState, useContext, createContext, useEffect } from 'react';



export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [username, setUserName] = useState([]);
  
 


  const [category, selectedCategory] = useState();
  const [difficultyLevel, setDifficultyLevel] = useState();
  const [ActiveStep, setActiveStep] = useState();

  const [results, setResults] = useState([]);


  const saveQuestions = (ques) => setQuestions(ques);
  const saveAnswers = (ans) => setAnswers(ans);
  const saveIndex = (ind) => setIndex(ind);


 

  useEffect(() => {
    console.log("appcontext update");
  }, [index, questions, answers, username,results])


  

  return (
    <AppContext.Provider  value={{ username, setUserName, saveQuestions, saveAnswers, saveIndex, index, questions, category, selectedCategory, difficultyLevel, setDifficultyLevel, results, setResults, setActiveStep}}>
      {children}
    </AppContext.Provider>
  );
};

