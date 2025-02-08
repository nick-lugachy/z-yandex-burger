import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './styles.css';
import { Provider } from 'react-redux';

import { burgerConstructor } from './services/constructor';
import { ingredients } from './services/ingredients';
import { ingredientDetail } from './services/ingredient-detail';
import { order } from './services/order';

const url = `https://norma.nomoreparties.space/api/ingredients`;

import { configureStore } from '@reduxjs/toolkit';
//import logger from 'redux-logger'
//import { customEnhancer } from './enhancers'

//const reducer = combineReducers({ constructor, ingredients });

const store = configureStore({
	reducer: { burgerConstructor, ingredients, ingredientDetail, order },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }), //.concat(logger),
	devTools: true, //process.env.NODE_ENV !== 'production',
	//  preloadedState,
	//  enhancers: [customEnhancer],
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
