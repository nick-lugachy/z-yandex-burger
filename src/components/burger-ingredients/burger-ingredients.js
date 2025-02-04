import { useState, useEffect, useRef, createRef } from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../components/ingrediedt-card/ingrediedt-card.js';
import { Modal } from '../../components/modal/modal.js';

import { IngredientDlg } from '../ingredient-details-dlg/ingredient-details-dlg.js';

const ItemGroups = [
	{ id: 'bun', name: 'Булки' },
	{ id: 'sauce', name: 'Соусы' },
	{ id: 'main', name: 'Начинки' },
];

export function BurgerIngredients(props) {
	const [curItem, clickItem] = useState(null);
	const [curTab, setCurTab] = useState(ItemGroups[0].id);

	const scrollRef = useRef(null);
	const headersRefs = useRef([]);

	useEffect(() => {
		headersRefs.current = ItemGroups.map(
			(_, i) => headersRefs.current[i] ?? createRef()
		);
	}, []);

	useEffect(() => {
		const h = headersRefs.current[ItemGroups.findIndex((a) => a.id === curTab)];

		if (h.current) {
			scrollRef.current.scrollTo(
				0,
				h.current.offsetTop - scrollRef.current.offsetTop
			);
		}
	}, [curTab]);

	return (
		<section className={styles.panel}>
			<h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
			<div className={styles.tabBar}>
				{ItemGroups.map((group, i) => (
					<Tab
						key={group.id}
						value={group.id}
						active={group.id === curTab}
						onClick={setCurTab}>
						{group.name}
					</Tab>
				))}
			</div>
			<section ref={scrollRef} className={styles.scroll}>
				{ItemGroups.map((item, i) => (
					<section key={item.id}>
						<h2
							ref={headersRefs.current[i]}
							id={item.id}
							className='text text_type_main-medium mt-6 mb-2'>
							{item.name}
						</h2>
						<section className={styles.ingredientGrid}>
							{props.data !== null &&
								props.data.map(
									(Ing) =>
										item.id === Ing.type && (
											<Ingredient
												ref={headersRefs.current[i]}
												key={Ing._id}
												dlg={clickItem}
												{...Ing}
											/>
										)
								)}
						</section>
					</section>
				))}
			</section>
			<Modal
				isOpen={curItem !== null}
				onClose={() => clickItem(null)}
				header='Детали ингридиента'>
				<IngredientDlg {...curItem} />
			</Modal>
		</section>
	);
}

import PropTypes from 'prop-types';
import { ingredientType } from '../ingredient-type.js';

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
};
