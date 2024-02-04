import { Button, FormControl, Grid, InputLabel, LinearProgress, Menu, MenuItem, Select, Stack } from '@mui/material';
import React, { useState, useContext } from 'react';
import { getQuestions } from '../../api/API';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from "react-router-dom";
import {shuffleArray} from '../../utils/utils';

export const Categories = () => {

    const [category, selectedCategory] = useState();
    const [difficultyLevel, setDifficultyLevel] = useState();
    const context = useContext(AppContext);
    const navigation = useNavigate();
    /// Loading for api call 
    const [loading, setLoading] = useState(false);

    const makeApiCall = async () => {
        getQuestions(10, category, difficultyLevel).then(res => {
            console.log(res);
            let questions = res.data?.results;
            questions = questions.map(x => {
                x.ans = x.incorrect_answers;
                x.ans.push(x.correct_answer);
                x.ans = shuffleArray(x.ans);
                return x;
            })
            const { saveQuestions } = context;
            saveQuestions(questions);
            navigation('/quiz')
        }).catch(err => {

        })
    }


    return (
        <div className='body-element'>
            <Grid alignItems="center" container spacing={2}>
                <Grid item xs={12}>
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
                            <MenuItem value={9}>General Knowledge</MenuItem>
                            <MenuItem value={10}>Entertainment: Books</MenuItem>
                            <MenuItem value={11}>Entertainment: Film</MenuItem>
                            <MenuItem value={12}>Entertainment: Music  </MenuItem>
                            <MenuItem value={13}>Entertainment: Musicals & Theatres  </MenuItem>
                            <MenuItem value={14}>Entertainment: Television  </MenuItem>
                            <MenuItem value={15}>Entertainment: Video Games </MenuItem>
                            <MenuItem value={16}>Entertainment: Board Games </MenuItem>
                            <MenuItem value={17}>EScience & Nature </MenuItem>
                            <MenuItem value={18}>Science: Computers  </MenuItem>
                            <MenuItem value={19}>Science: Mathematics  </MenuItem>
                            <MenuItem value={20}>Mythology  </MenuItem>
                            <MenuItem value={21}>Sports </MenuItem>
                            <MenuItem value={22}>Geography  </MenuItem>
                            <MenuItem value={23}>History </MenuItem>
                            <MenuItem value={24}>Politics  </MenuItem>
                            <MenuItem value={25}>Art </MenuItem>
                            <MenuItem value={26}>Celebrities  </MenuItem>
                            <MenuItem value={27}>Animals  </MenuItem>
                            <MenuItem value={28}>Vehicles  </MenuItem>
                            <MenuItem value={29}>Entertainment: Comics </MenuItem>
                            <MenuItem value={30}>Science: Gadgets  </MenuItem>
                            <MenuItem value={31}>Entertainment: Japanese Anime & Manga </MenuItem>
                            <MenuItem value={32}>Entertainment: Cartoon & Animations </MenuItem>
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
                    <Button sx={{ height: '50px' }} fullWidth variant="outlined" onClick={() => {
                        setLoading(true);
                        makeApiCall();
                    }}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {loading ?
                                <LinearProgress color="secondary" />
                                :
                                "CONTINUE"
                            }
                        </Stack>

                    </Button>
                </Grid>
            </Grid>
        </div >

    )
}