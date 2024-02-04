import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from './pages/login/Loginpage';
import Quiz from './pages/quiz/Quiz';
import { Categories } from './pages/quiz/Categories';
import { AppProvider } from './context/AppContext';


const App = () => {
  return (
    <div className='root-element'>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path='/select-category' element={<Categories />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>

  )
}
export default App;

