import React, { createContext, useState,useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Loginpage from './pages/login/Loginpage';
import Quiz from './pages/quiz/Quiz';
import { Categories } from './pages/quiz/Categories';
import { AppProvider } from './context/AppContext';
import Results from './pages/last/Results';
import ConfirmationDialog from './pages/quiz/ConfirmationDialog';


const App = () => {
  
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control showing the confirmation dialog

    // Add event listener for beforeunload
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            // Display confirmation dialog
            event.returnValue = '';
            setShowConfirmation(true);
           
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Remove event listener when component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleConfirm = () => {
      setShowConfirmation(false);
      // Reload the page
      window.location.reload();
    };
  
    const handleCancel = () => {
      setShowConfirmation(false);
    };


  return (
    <div className='root-element'>
      <AppProvider>
        <Router>
        {showConfirmation && 
        <ConfirmationDialog 
        setShowConfirmation={setShowConfirmation}
        onConfirm={handleConfirm}
        onCancel={handleCancel} 
        />}

          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path='/select-category' element={<Categories />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path='/results' element={<Results />}/>
            <Route path="/category" element={<Categories />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>

  )
}
export default App;

