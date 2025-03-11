import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './styles.css';
import { Provider } from 'react-redux';

import { burgerConstructor } from './services/constructor';
import { ingredients } from './services/ingredients';
import { ingredientDetail } from './services/ingredient-detail';
import { order } from './services/order';
import { profile } from './services/profile';

import { configureStore } from '@reduxjs/toolkit';

import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore({
	reducer: { burgerConstructor, ingredients, ingredientDetail, order, profile },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }), //.concat(logger),
	devTools: true,
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
