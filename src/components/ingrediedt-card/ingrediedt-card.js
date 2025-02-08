import styles from './ingrediedt-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { detail_showDlg } from '../../services/ingredient-detail';

export const Ingredient = (props) => {
	const dispatch = useDispatch();

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { id: props._id },
	});

	const data = useSelector((state) => state.burgerConstructor);

	let count = null;

	if (data.bun !== null) {
		if (props._id === data.bun._id) {
			count = 2;
		} else {
			data.ingredients.map((Item) => (props._id === Item._id ? count++ : 0));
		}
	}

	return (
		<div
			ref={dragRef}
			onClick={() => dispatch(detail_showDlg(props))}
			className={styles.itemCard}>
			<img src={props.image} alt={props.name} className='ml-4 mr-4' />
			<p className='text text_type_digits-default m-1'>
				{props.price}
				<CurrencyIcon className={styles.icon} type='primary' />
			</p>
			<p className={styles.itemName + ' text text_type_main-default'}>
				{props.name}
			</p>
			{count && (
				<Counter count={count} size='default' extraClass={styles.counter} />
			)}
		</div>
	);
};

import PropTypes from 'prop-types';
import { ingredientType } from '../ingredient-type.js';

Ingredient.propTypes = { ...ingredientType };
