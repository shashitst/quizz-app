
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Quiz from '../quiz/Quiz';
import { TextField, Button } from '@mui/material';

const Loginpage = () => {


  const navigation = useNavigate();
  const [userName, setUserName] = useState();

  const handleContinue = (event) => {
    console.log('User Name:', event.tar);
    navigation('/select-category')
  };

  return (
    <div className='body-element'>
      <img
        src="https://cdn-icons-png.flaticon.com/512/12930/12930579.png"
        alt="Company Logo"
        style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
      />

      <div style={{ marginBottom: '20px' }}>
        <TextField fullWidth id="outlined-basic" label="Enter your name" variant="outlined"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </div>
      <Button fullWidth disabled={!userName} onClick={handleContinue} variant="outlined">Continue</Button>

     </div>
  );
};
export default Loginpage;


