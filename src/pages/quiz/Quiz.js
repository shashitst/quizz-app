import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import './Quiz.css'
import { FormLabel, Grid, Button, LinearProgress, Paper, Stepper, Step, StepLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestions } from "../../api/API";
import { categories, leve, level } from "../../utils/utils";




const Quiz = () => {

   

    const context = useContext(AppContext);
    const { index,setIndex, answers, saveAnswers,
        questions,setQuestions, saveIndex, saveQuestions,
        username, setUserName, category, difficultyLevel, results
    } = context;


    const [activeStep, setActiveStep] = useState(0);
    const steps = Array.from({ length: 10 }, (_, i) => `Question ${i + 1}`);



    const indexQuestion = questions[index];

    const navigation = useNavigate();
    useEffect(() => {


        if (!indexQuestion) {
            navigation("/");
        }

    }, [])



    useEffect(() => {
        console.log("question index", index);


    }, [index, context])





 

    if (!indexQuestion && index < 9) {
        return <></>
    }

    const categoryname = categories.find(x => x.id == category);
    const levels = leve.find(x => x.level == difficultyLevel);


    const handleAnswerSelect = (selectedAns) => {
        questions[index].selectedAns = selectedAns;
        const nextIndex = index + 1;
        saveQuestions(questions);
        if (nextIndex < 10) {
            saveIndex(nextIndex);
            setActiveStep(nextIndex);
        } else {
            handleSubmit();
        }
    };




    const handleSubmit = () => {
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

        
        questions.forEach(question => {
            if (question.selectedAns === question.correct_answer) {
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
        });

        navigation(`/results?correct=${correctAnswers}&incorrect=${incorrectAnswers}`);
       
    };






  

    return (
        <>
        <div className="quiz-container">
            <>
            <h2>Hello {username}, </h2>
            
            <div className="header">
            <h3>category :  {categoryname.name}</h3>
            <h4>difficultylevel : {levels.level}</h4>
            </div>

            <Grid container spacing={2} sx={{ textAlign: "center" }}>
                <Grid item sx={{ textAlign: "center" }} >
                    
                <Paper elevation={3} className="question-box">
                        
                        </Paper>
                        
                    <FormLabel>
                        Question No : {index + 1} / 10
                    </FormLabel>
                </Grid>
                <Grid item>
                    <h4 dangerouslySetInnerHTML={{ __html: indexQuestion.question }}></h4>

                    <Grid container spacing={2}>
                        {indexQuestion.ans.map(x => {
                            return (
                                <Grid item md={6} xs={12} key={x}>
                                    <Button onClick={() => handleAnswerSelect(x)} 
                       


                                 variant="outlined" fullWidth> <span dangerouslySetInnerHTML={{ __html: x }} ></span>  </Button>
                                </Grid>
                            )
                        })}
                      

                    </Grid>
                    
                    
                    
                </Grid>
                

                <Grid item>
                    <Grid container spacing={2}
                    >
                        <Grid item xs={6}>
                            <Button disabled={index == 0} onClick={() => {
                                const i = index - 1;
                                saveIndex(i);
                            }}>Previous</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={() => {
                                let correctans = 0;
                                let incorrectans = 0;
                                if (index == 9) {
                                    questions.forEach(x => {
                                        if (x.selectedAns == x.correct_answer) {
                                            correctans++;
                                        } else {
                                            incorrectans++;
                                        }
                                    })
                                   


                                } else {
                                    const i = index + 1;
                                    saveIndex(i);
                                }
                            }} >
                                {
                                     <Button onClick={handleSubmit}>
                                  { index == 9 ? "Submit" : "Next"}
                                    </Button>

                                }
                               

                                 

                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
            <div className="stepper-container">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
               
            </div>
            
            


        </>
        </div>
</>
    )

}


export default Quiz;