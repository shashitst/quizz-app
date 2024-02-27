import { Button, FormControl, Grid, InputLabel, LinearProgress, Menu, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { getQuestions } from '../../api/API';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from "react-router-dom";
import {categories, shuffleArray} from '../../utils/utils';

export const Categories = () => {

 
    const context = useContext(AppContext);
    const { saveQuestions, category, selectedCategory, difficultyLevel, setDifficultyLevel } = context;

    const navigation = useNavigate();
    /// Loading for api call 
    const [loading, setLoading] = useState(false);

    const makeApiCall = async () => {
        getQuestions(10, category, difficultyLevel)
        .then(res => {
            console.log(res);
            let questions = res.data?.results;
            questions = questions.map(x => {
                x.ans = x.incorrect_answers;
                x.ans.push(x.correct_answer);
                x.ans = shuffleArray(x.ans);
                return x;
            })
           
            saveQuestions(questions);
            navigation('/quiz')
        }).catch(err => {
             console.error(err);
        })
    }


    return (
        <div className='body-element'>
            
            <Grid alignItems="center" container spacing={4}>
                <Grid item xs = {12}>
                    <Typography gutterBottom align="center">
                        Select Your Categories
                    </Typography>
                <Grid item xs={12} >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Select Category "
                            onChange={(event) => {
                                selectedCategory(event.target.value);
                            }}
                        >
                            {categories.map(x =>{
                                return (
                                    <MenuItem value={x.id}>{x.name}</MenuItem>
                                )
                            })  }
                            
                            
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Difficulty Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={difficultyLevel}
                            label="Select Difficulty Level"
                            onChange={(event) => {
                                setDifficultyLevel(event.target.value)
                            }}
                        >
                            <MenuItem value={'easy'}>Easy</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'hard'}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button sx={{ height: '50px', color: 'black' }} fullWidth variant="outlined" onClick={() => {
                        setLoading(true);
                        makeApiCall();
                       
                    }} 
                    onKeyDown={(event) => {
                        if (event.keyCode == 13) {
                            setLoading(true);
                            makeApiCall();
                        }
                    }}
                    
                >
                        <Stack sx={{ width: '100%' }} spacing={2}
                        onKeyDown={(event) => {
                            if (event.keyCode == 13) {
                                setLoading(true);
                                makeApiCall();
                            }
                        }}
                        
                        
                        >
                            {loading ?
                                <LinearProgress color="secondary" />
                                :
                                "START QUIZ"
                            }
                            
                           
                           
                        </Stack>

                    </Button>
                </Grid>
            </Grid>
            </Grid>
        </div >

    )
}