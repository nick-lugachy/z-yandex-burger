import { useEffect } from 'react';
import styles from './app.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader } from '../header/header.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';

import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	return (
		<div className={styles.root}>
			<DndProvider backend={HTML5Backend}>
				<AppHeader />
				<main className={styles.main}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			</DndProvider>
		</div>
	);
};
