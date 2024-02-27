
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import Quiz from '../quiz/Quiz';
import { TextField, Button, Alert, Typography } from '@mui/material';
import { Snackbar } from '@mui/base';
import { Avatar } from '@mui/material';
import './Loginpage.css';

const Loginpage = () => {


  const navigation = useNavigate();

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const context = useContext(AppContext);

  //object destructing 

  // context.username 
  const { username, setUserName } = context;

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  const handleContinue = () => {
    // if (username == undefined || username == "") {
    if (state.username === "" || !state.username.match(/^[a-zA-Z]{5,}$/)) {
      setState({ ...state, open: true });
    
   
    } else {
      
      
      navigation('/select-category')
    }
  };

  const handleInputChange = (event) => {
    setState({ ...state, username: event.target.value });
  };

  
  return (
    
    <div className="login-container">
     <div className="content"> 

    <div style={
      { border: '1px solid#E5E8F0',
       textAlign: 'center',
        padding: '20px',
         borderRadius: '8px',
          position: 'absolute',
           top: '50%',
            left: '50%',
            height: 'auto',
             transform: 'translate(-50%, -50%)', }}
      className='body-element'>
        
      
      <img
        src="https://i.imgur.com/4FNV3mP.png
        "
        alt="Company Logo"
        style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
      />

      <div style={{ marginBottom: '20px' }}>
      <div className="form-container">
      <Typography variant="h6" gutterBottom>
        Test Your Brain, here
      </Typography>
        <Snackbar
          anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
          open={state.open}
          autoHideDuration={1000}
          onClose={handleClose}
          message="Plesae Enter Username"
          key={Date.now()}
        >
          <Alert onClose={handleClose} severity="error">
          Please Enter a Valid Name
          </Alert>

        </Snackbar>
        <TextField fullWidth id="outlined-basic" label="Enter your name" variant="outlined"  

          onKeyDown={(event) => {
            if (event.keyCode == 13) {
              if (username != undefined && username != "") {
                //
                handleContinue(event)
               
              } else {
                setState({ ...state, open: true });
              }

            }
          }}
          
          onChange={(event) => {
            setUserName(event.target.value);
            
           handleInputChange(event)
          }}
        />
      </div>

      <Button  color="error" fullWidth disabled={!username} onClick={handleContinue} variant="outlined">Continue</Button>
     

    </div>
    </div>
  </div>
  </div>
 
    
  );
};
export default Loginpage;


