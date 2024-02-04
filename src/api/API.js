
import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'https://opentdb.com', // Set the base URL for all requests
    // timeout: 5000, // Set a timeout of 5 seconds for all requests
    headers: {
        'Content-Type': 'application/json', // Set default content type for all requests
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Set a default authorization header
    },
});



export const getQuestions = (amount = 10, category, difficulty) => {
    const path = `api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    return apiInstance.get(path).then(res => {
        return res;
    }).catch(err => {
        console.error(err);
        throw err;
    })
}