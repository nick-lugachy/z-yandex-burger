import { useState, useEffect } from 'react';

import { AppHeader } from '../components/header/header.js';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients.js';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor.js';

export const App = () => {
	const [ingData, setData] = useState({
		data: null,
		loading: true,
	});

	useEffect(() => {
		const getProductData = async () => {
			setData({ ...ingData, loading: true });
			const res = await fetch(
				`https://norma.nomoreparties.space/api/ingredients`
			);
			const data = await res.json();
			setData({ data: data.data, loading: false });
		};

		getProductData();
	}, []);

	return (
		<div style={{ top: 0, height: '100vh' }}>
			<AppHeader />
			<main style={{ display: 'flex', flexWrap: 'wrap' }}>
				<BurgerIngredients data={ingData.loading ? null : ingData.data} />
				<BurgerConstructor data={ingData.loading ? null : ingData.data} />
			</main>
		</div>
	);
};
