import { GET_QUOTE } from './actionTypes';

export const getQuote = data => ({
    type: GET_QUOTE,
    payload: {
        quote: data[0].quote,
        author: data[0].character
    }
});