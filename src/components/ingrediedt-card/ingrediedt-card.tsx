import styles from './ingrediedt-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { useSelectorTp, useDispatchTp } from '../../index';
import { Iingredient, IBurgerArr } from '../../services/types';

export const Ingredient = (props: Iingredient) => {
	const location = useLocation();

	const ingredientId = props._id;

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { id: props._id },
	});

	const data: IBurgerArr = useSelectorTp((state) => state.burgerConstructor);

	let count: number = 0;

	if (data.bun !== null) {
		if (props._id === data.bun._id) {
			count = 2;
		} else {
			data.ingredients.map((Item) => (props._id === Item._id ? count++ : 0));
		}
	}

	return (
		<Link
			key={ingredientId}
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}
			className={styles.link}>
			<div
				ref={dragRef}
				//			onClick={() => dispatch(detailShowDlg(props))}
				className={styles.itemCard}>
				<img src={props.image} alt={props.name} className='ml-4 mr-4' />
				<p className='text text_type_digits-default m-1'>
					{props.price}
					<CurrencyIcon className={styles.icon} type='primary' />
				</p>
				<p className={styles.itemName + ' text text_type_main-default'}>
					{props.name}
				</p>
				{count != 0 && (
					<Counter count={count} size='default' extraClass={styles.counter} />
				)}
			</div>
		</Link>
	);
};
