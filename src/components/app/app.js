import { useState, useEffect } from 'react';
import styles from './app.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader } from '../header/header.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';

import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients';
import { addIngredient } from '../../services/constructor';

const url = `https://norma.nomoreparties.space/api/ingredients`;

export const App = () => {
	const data = useSelector((state) => state.ingredients.data);

	const dispatch = useDispatch();

	function fillDefaultBurger(ing) {
		let fCount = 7;

		if (ing) {
			ing.map((d) => {
				if (fCount) {
					dispatch(addIngredient(d));
					fCount--;
				}
			});
		}
	}

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	useEffect(() => {
		//		fillDefaultBurger(data);
	}, [data]);

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
