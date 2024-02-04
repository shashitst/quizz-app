import React, {useState, useContext, createContext} from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const saveQuestions = (ques) => setQuestions(ques);
  const saveAnswers = (ans) => setAnswers(ans);
  const saveIndex = (ind) => setIndex(ind);

  return (
    <AppContext.Provider value={{ saveQuestions, saveAnswers, saveIndex, index, questions,answers }}>
      {children}
    </AppContext.Provider>
  );
};

 