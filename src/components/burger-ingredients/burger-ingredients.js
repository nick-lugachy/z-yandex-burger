import { useState, useEffect } from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../../components/modal/modal.js';

const ItemGroups = [
	{ id: 'bun', name: 'Булки' },
	{ id: 'sauce', name: 'Соусы' },
	{ id: 'main', name: 'Начинки' },
];

const Header = (props) => (
	<h1 className='text text_type_main-large mt-10 mb-5'>{props.children}</h1>
);

const SubHeader = (props) => (
	<p id={props.id} className='text text_type_main-medium mt-6 mb-2'>
		{props.children}
	</p>
);

const Tabs = ({ setCurTab, curTab }) => {
	return (
		<div className='mb-2' style={{ display: 'flex', flexWrap: 'wrap' }}>
			{ItemGroups.map((Item) => (
				<Tab
					key={Item.id}
					value={Item.id}
					active={Item.id === curTab}
					onClick={setCurTab}>
					{Item.name}
				</Tab>
			))}
		</div>
	);
};

const Ingredient = (props) => {
	return (
		<div onClick={() => props.dlg(props)} className={styles.itemCard}>
			<img src={props.image} className='ml-4 mr-4' />
			<p className='text text_type_digits-default m-1'>
				{props.price}
				<CurrencyIcon className={styles.icon} type='primary' />
			</p>
			<p className='text text_type_main-default' style={{ height: '48px' }}>
				{props.name}
			</p>
		</div>
	);
};

const IngredientDlg = (props) => {
	return (
		<>
			<img src={props.image_large} className='ml-4 mr-4' />
			<p className='text text_type_main-medium mt-4 mb-4'>{props.name}</p>
			<span style={{ display: 'flex', gap: '20px' }} className='mb-5'>
				<p className='text text_type_main-default text_color_inactive'>
					Калории, ккал <br /> {props.calories}
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Белки, г <br /> {props.proteins}
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Жиры, г <br /> {props.fat}
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Углеводы, г <br /> {props.carbohydrates}
				</p>
			</span>
		</>
	);
};

const IngredientList = (props) => {
	return (
		props.data !== null && (
			<div className={styles.ingredientGrid}>
				{props.data.map(
					(Ing) =>
						props.filter === Ing.type && (
							<Ingredient key={Ing._id} dlg={props.dlg} {...Ing} />
						)
				)}
			</div>
		)
	);
};

export function BurgerIngredients(props) {
	const [curItem, clickItem] = useState(null);

	const [curTab, setCurTab] = useState(ItemGroups[0].id);

	useEffect(() => {
		var h = document.getElementById(curTab);
		var el = document.getElementById('ingSection');
		el.scrollTo(0, h.offsetTop - el.offsetTop);
	}, [curTab]);

	return (
		<section className={styles.section}>
			<Header>Соберите бургер</Header>
			<Tabs setCurTab={setCurTab} curTab={curTab} />
			<section
				id='ingSection'
				style={{
					overflowY: 'scroll',
					maxHeight: '700px',
				}}>
				{ItemGroups.map((Item) => (
					<div key={Item.id}>
						<SubHeader id={Item.id}>{Item.name}</SubHeader>
						<IngredientList
							data={props.data}
							filter={Item.id}
							dlg={clickItem}
						/>
					</div>
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
