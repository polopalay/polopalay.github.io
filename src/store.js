import {createStore} from 'redux';
import combineReducers from './reducers/root.reducer';

export default createStore(combineReducers);

