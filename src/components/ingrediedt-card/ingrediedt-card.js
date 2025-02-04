import styles from './ingrediedt-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const Ingredient = (props) => {
	return (
		<div onClick={() => props.dlg(props)} className={styles.itemCard}>
			<img src={props.image} alt={props.name} className='ml-4 mr-4' />
			<p className='text text_type_digits-default m-1'>
				{props.price}
				<CurrencyIcon className={styles.icon} type='primary' />
			</p>
			<p className={styles.itemName + ' text text_type_main-default'}>
				{props.name}
			</p>
			<Counter count={1} size='default' extraClass={styles.counter} />
		</div>
	);
};

import PropTypes from 'prop-types';
import { ingredientType } from '../ingredient-type.js';

Ingredient.propTypes = { dlg: PropTypes.func.isRequired, ...ingredientType };
