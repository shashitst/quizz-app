import React, { useState, useContext, useEffect } from "react";
import { Avatar } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import "./Quiz.css";
import {
    FormLabel,
    Grid,
    Button,
    LinearProgress,
    Paper,
    Stepper,
    Step,
    StepLabel,
    
    
    
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Check';
import CheckIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestions } from "../../api/API";
import { categories, leve, level } from "../../utils/utils";



const Quiz = () => {
     const context = useContext(AppContext);
    const {
        index,
        setIndex,
        answers,
        saveAnswers,
        questions,
        setQuestions,
        saveIndex,
        saveQuestions,
        username,
        setUserName,
        category,
        difficultyLevel,
        results,
        
    } = context;



  
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [activeStep, setActiveStep] = useState(0);
   
   
    const steps = Array.from({ length: 10 }, (_, i) => `Question ${i + 1}`);
    const indexQuestion = questions[index];

    const [render, setRender] = useState();

    const navigation = useNavigate();
    
     useEffect (()=>{
       if (!indexQuestion) {
            navigation("/");
        }
    }, []);

    useEffect(() => {
        console.log("question index", index);
    }, [index, context]);

    if (!indexQuestion && index < 9) {
        return <></>;
    }

    const categoryname = categories.find((x) => x.id == category);
    const levels = leve.find((x) => x.level == difficultyLevel);

    const handleAnswerSelect = (selectedAns) => {
        questions[index].selectedAns = selectedAns;
        questions[index].isCorrect = selectedAns === questions[index].correct_answer;
        const nextIndex = index + 1;
        saveQuestions(questions);
        setRender(Date.now())
        if (nextIndex < 10) {
            setTimeout(() => {
            saveIndex(nextIndex);
            setActiveStep(nextIndex);
        }, 2 * 1000);
       
        }
    };

  
    




    const handleSubmit = () => {
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

        questions.forEach((question) => {
            if (question.selectedAns === question.correct_answer) {
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
        });

        navigation(
            `/results?correct=${correctAnswers}&incorrect=${incorrectAnswers}`
        );
    };

   
    let selectedAns = indexQuestion.selectedAns;

    let isSelectedCorrect = indexQuestion.correct_answer == selectedAns;


    const handlePlayAgain = () => {
        setIndex(0);
        setQuestions(0);
        setActiveStep(0);
        navigation("/category");
    };

   
   


    return (
        <>
            <div className="quiz-container">
            <div className="content">
          
                <Grid container rowSpacing={3} spacing={2}>
                    <Grid item alignContent="center" xs={12}>
                    <Avatar sx={{ width: 100, height: 100, marginBottom: 2, bgcolor: '#007bff' }}>{username && username.trim() ? username.trim()[0].toUpperCase() : ''}</Avatar>
            
                        <h2>Hello {username}, </h2>
                    </Grid>

                    <Grid item xs={12}>
                        <h3>Category : {categoryname.name}</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>Difficulty Level : {levels.name}</h4>
                    </Grid>

                    <Grid rowSpacing={2} item xs={12}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel >

                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    

                    <Grid
                        item
                        xs={12}
                        rowGap={5}
                        sx={{
                            marginTop:"30px",
                            padding: "20px",
                            backgroundColor: "#FFD1D3",
                            borderRadius : "5px"
                        }}
                    >
                        <h4
                            dangerouslySetInnerHTML={{ __html: indexQuestion.question }}
                        ></h4>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {indexQuestion.ans.map((x) => {
                                return (
                                    <Grid item md={6} xs={12} key={x}>
                                        <Button
                                            onClick={() => handleAnswerSelect(x)}
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                backgroundColor: indexQuestion.isCorrect ? (x == indexQuestion.selectedAns) ? "lightgreen" : ""  : x == indexQuestion.selectedAns ? "#FFD1D3" : ""

                                            }}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: x }}></span>{" "}
                                        </Button>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>

                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    disabled={index == 0}
                                    onClick={() => {
                                        const i = index - 1;
                                        saveIndex(i);
                                        setActiveStep(i);
                                    }}
                                >
                                    Previous
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button disabled={!indexQuestion.selectedAns} 
                              

                                
                                    onClick={() => {
                                        let correctans = 0;
                                        let incorrectans = 0;
                                        if (index == 9) {
                                            questions.forEach((x) => {
                                                if (x.selectedAns == x.correct_answer) {
                                                    correctans++;
                                                } else {
                                                    incorrectans++;
                                                }
                                            });
                                            handleSubmit();
                                        } else {
                                            const i = index + 1;
                                            saveIndex(i);
                                        }
                                    }}
                                   
                                  
                                >
                                    
                                        
                                  
                                 {index === 9 ? "Submit" : "Next"}
                                    
                                </Button>

                               
                                </Grid>
                              
                            </Grid>
                        </Grid>
                    
                   </Grid>
                  
                
                
                </div>
                </div>
           
        </>
        
    );
};



export default Quiz;
