import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './styles.css';
import { Provider } from 'react-redux';

import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

import { burgerConstructor } from './services/constructor';
import { ingredients } from './services/ingredients';
import { ingredientDetail } from './services/ingredient-detail';
import { order } from './services/order';
import { profile } from './services/profile';

import { configureStore } from '@reduxjs/toolkit';

import { BrowserRouter as Router } from 'react-router-dom';

import { socketMiddleware } from './services/socket-middleware';

import {
	connect,
	disconnect,
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
	feed,
} from './services/feed';

const socketMW: any = socketMiddleware({
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onError,
	onMessage,
	onClose,
});

const store = configureStore({
	reducer: {
		burgerConstructor,
		ingredients,
		ingredientDetail,
		order,
		profile,
		feed,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(socketMW);
	},
	devTools: true,
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	//	<StrictMode>
	// need help! In strict mode the use Effect method calling twice permanently
	// as result, I catch errors in console with socket connection
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	//	</StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useSelectorTp: TypedUseSelectorHook<RootState> = useSelector;
export const useDispatchTp = () => useDispatch<AppDispatch>();
