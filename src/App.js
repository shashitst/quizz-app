import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from './pages/login/Loginpage';

import Quiz from './pages/quiz/Quiz';



const App  =()=>{
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
    

      </>

    )
}
export default App;

