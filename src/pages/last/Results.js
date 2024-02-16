import { Grid, Button } from "@mui/material";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./Results.css";
const Results = () => {
    const context = useContext(AppContext);
    const{
        saveIndex,
        saveQuestions,
        saveAnswers,
        setActiveStep
    } = context
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const correctAnswers = parseInt(queryParams.get("correct"));
    const incorrectAnswers = parseInt(queryParams.get("incorrect"));
    const totalQuestions = correctAnswers + incorrectAnswers;
    
    let message;
    let gifUrl;
    
    if (correctAnswers > totalQuestions - 6) {
        message = "Congratulations! You did great!";
        gifUrl = "https://media.tenor.com/NXCBBlP9ONMAAAAi/benjamins-benjammins.gif";
    } else {
       
        message = "Better luck next time!";
        gifUrl = "https://media.tenor.com/yRJ843_ROf4AAAAi/twinkl-slt-quiz.gif";
    }

    const handlePlayAgain = ()=>{ 
     
        saveIndex(0);
        saveQuestions(0);
        saveAnswers(0);

        setActiveStep(0);
        // Navigate back to the category page
        
        navigate('/category')
     
    };


    return (
        <div  className="results-container">
        <div className="background-image"></div> 
        <div className="content"> 
        
            <h2>Quiz Results</h2>
           
            <p>Your Score: {correctAnswers} / {totalQuestions}</p>
            <p>{message}</p>
              <Grid container spacing={2} alignItems="center">
            <img src={gifUrl} alt="Animated GIF" />
           
            
          
            <Grid item xs={12}>
                    <Button variant="outlined" href="#outlined-buttons" onClick={handlePlayAgain} style={{ color: 'black' }}>Play Again</Button>
                    </Grid>
            </Grid>
        </div>
        </div>
    );
};

export default Results;
