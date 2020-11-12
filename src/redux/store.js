import { createStore } from 'redux';
import quoteReducer from './reducers/getQuote';

export default createStore(quoteReducer);
