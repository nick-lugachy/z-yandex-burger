import { configureStore } from '@reduxjs/toolkit';
//import logger from 'redux-logger'
import engredientsReducer from './engredients';
//import { customEnhancer } from './enhancers'

const preloadedState = {
	todos: [],
};
const store = configureStore({
	engredientsReducer,
	//  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: true, //process.env.NODE_ENV !== 'production',
	//  preloadedState,
	//  enhancers: [customEnhancer],
});
