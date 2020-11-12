import { GET_QUOTE } from '../actionTypes';

const initialState = {
    quote: "",
    author: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_QUOTE: {
            const newQuote = action.payload.quote;
            const newAuthor = action.payload.author;
            return {
                quote: newQuote,
                author: newAuthor
            };
        }
        default:
            return state;
    }
}