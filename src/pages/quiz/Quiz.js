import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
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

    const navigation = useNavigate();
    useEffect(() => {
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


    return (
        <>
            <div className="quiz-container">
                <Grid container rowSpacing={3} spacing={2}>
                    <Grid item alignContent="center" xs={12}>
                        <h2>Hello {username}, </h2>
                    </Grid>

                    <Grid item xs={6}>
                        <h3>Category : {categoryname.name}</h3>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Difficulty Level : {levels.name}</h4>
                    </Grid>

                    <Grid rowSpacing={2} item xs={12}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel></StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        rowGap={5}
                        sx={{
                            marginTop: "20px",
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
                                                backgroundColor: x === indexQuestion.selectedAns ? "lightgreen"
                                                    :  ""
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
                                    }}
                                >
                                    Previous
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
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
                                        } else {
                                            const i = index + 1;
                                            saveIndex(i);
                                        }
                                    }}
                                >
                                    {
                                        <Button onClick={handleSubmit}>
                                            {index == 9 ? "Submit" : "Next"}
                                        </Button>
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Quiz;
