
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Quiz from '../quiz/Quiz';
const Loginpage = () => {


  const navigation = useNavigate();
  const [userName, setUserName] = useState('');
    
  const handleContinue = () => {
  
    console.log('User Name:', userName);
    navigation('/Quiz')

    

    

  };

  return (
    <div style={{ border: '1px solid#325199',textAlign: 'center', padding: '20px',borderRadius: '8px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/12930/12930579.png"
        alt="Company Logo"
        style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
      />
      <h2>Enter Your Name</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleContinue} disabled={!userName}>
        Continue
      </button>
    </div>
  );
};
export default Loginpage;


