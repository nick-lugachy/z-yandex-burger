import { useState, useEffect } from 'react';
import styles from './app.module.css';

import { AppHeader } from '../header/header.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';

const url = `https://norma.nomoreparties.space/api/ingredients`;

export const App = () => {
	const [ingData, setData] = useState({
		data: null,
		loading: true,
	});

	const [burger, setBurger] = useState({
		bun: null,
		ingredients: null,
	});

	const fillDefaultBurger = (data) => {
		let fill = [];
		let bun;
		let fCount = 7;

		data.map((d) => {
			if (d.type === 'bun') bun = d;
			else if (fCount) {
				fill.push(d);
				fCount--;
			}
		});

		setBurger({ bun: bun, ingredients: fill });
	};

	useEffect(() => {
		const getProductData = async () => {
			try {
				setData({ ...ingData, loading: true });

				const res = await fetch(url);
				if (!res.ok) {
					throw new Error(res.status);
				}
				const data = await res.json();
				setData({ data: data.data, loading: false });
				fillDefaultBurger(data.data);
			} catch (error) {
				console.log(error);
			}
		};

		getProductData();
	}, []);

	return (
		<div className={styles.root}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients data={ingData.loading ? null : ingData.data} />
				<BurgerConstructor {...burger} />
			</main>
		</div>
	);
};
