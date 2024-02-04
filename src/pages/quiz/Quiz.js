import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import './Quiz.css'
import { FormLabel, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



const Quiz = () => {

    const context = useContext(AppContext);
    let { index, answers, saveAnswers, questions, saveIndex, saveQuestions } = context;

    const indexQuestion = questions[index];

    const navigation = useNavigate();
    useEffect(() => {

        if (!indexQuestion) {
            navigation("/");
        }

    }, [])

    useEffect(() =>{},[index, context])


    if (!indexQuestion) {
        return <></>
    }


    return (
        <>
            <FormLabel>
                Question No : {index + 1}
            </FormLabel>

            <h4 dangerouslySetInnerHTML={{ __html: indexQuestion.question }}></h4>

            <Grid container spacing={2}>
                {indexQuestion.ans.map(x => {
                    return (
                        <Grid item xs={6}>
                            <Button onClick={() => {
                                questions[index].selectedAns = x;
                                saveQuestions(questions)
                                saveIndex(index++);
                                //navigation("/quiz")
                            }} variant="outlined" fullWidth>{x}</Button>
                        </Grid>
                    )
                })}

            </Grid>

        </>

    )

}

export default Quiz