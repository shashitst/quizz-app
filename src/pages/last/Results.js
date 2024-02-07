import React from "react";
import { useLocation } from "react-router-dom";
import "./Results.css";
const Results = () => {
    const location = useLocation();
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

    return (
        <div  className="results-container">
        <div className="background-image"></div> 
        <div className="content"> 
            <h2>Quiz Results</h2>
           
            <p>Your Score: {correctAnswers} / {totalQuestions}</p>
            <p>{message}</p>
            <img src={gifUrl} alt="Animated GIF" />
        </div>
        </div>
    );
};

export default Results;
