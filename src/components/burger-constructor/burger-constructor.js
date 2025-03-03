import { useMemo, useRef } from 'react';
import styles from './burger-constructor.module.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag, useDrop } from 'react-dnd';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	remIngredient,
	InsertIngredientAfter,
} from '../../services/constructor';

function Element(props) {
	const dispatch = useDispatch();

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: {
			id: props._id,
			guid: props.guid,
		},
	});

	const [{ isHover, delta }, dropRef] = useDrop({
		accept: 'ingredient',
		drop(item) {
			dispatch(
				InsertIngredientAfter(item.id, item.guid, props.tp ?? props.guid)
			);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
			delta: monitor.getDifferenceFromInitialOffset(),
		}),
	});

	const paddingBottom = isHover && props.tp !== 'bottom' ? '60px' : '8px';
	const paddingTop = isHover && props.tp === 'bottom' ? '60px' : '8px';
	const marginLeft = props.tp && props._id ? '24px' : '0px';

	const ref = useRef();
	const dndRef = dragRef(dropRef(ref));

	return (
		<div
			ref={dndRef}
			className={styles.elementContainer}
			style={{ paddingBottom, paddingTop, marginLeft }}>
			{props._id ? (
				<>
					{!props.tp && <DragIcon />}
					<ConstructorElement
						type={props.tp}
						isLocked={props.tp !== undefined}
						text={
							props.name +
							(props.tp === 'top'
								? ' (Верх)'
								: props.tp === 'bottom'
								? ' (Низ)'
								: '')
						}
						price={props.price}
						thumbnail={props.image_mobile}
						handleClose={() => dispatch(remIngredient(props.guid))}
					/>
				</>
			) : (
				<div className={styles.dummy} />
			)}
		</div>
	);
}

export function BurgerConstructor(props) {
	const navigate = useNavigate();

	const confirmOrder = () => {
		if (data.bun === null) return;
		//		dispatch(orderCreate());
		navigate('/order');
		//		openModal();
	};

	const data = useSelector((state) => state.burgerConstructor);

	const orderAmount = useMemo(() => {
		let summ = 2 * (data.bun === null ? 0 : data.bun.price);
		data.ingredients.map((item) => (summ += item.price));
		return summ;
	}, [data]);

	return (
		<section className={styles.section}>
			<>
				<Element {...data.bun} tp='top' />
				<div className={styles.scrollSection}>
					{data.ingredients[0] ? (
						data.ingredients.map((item) => (
							<Element key={item.guid} {...item} />
						))
					) : (
						<Element />
					)}
				</div>
				<Element {...data.bun} tp='bottom' />
			</>
			<div className={styles.total}>
				<p className='text text_type_digits-medium pt-2'>{orderAmount}</p>
				<CurrencyIcon className={styles.icon} />
				<Button onClick={confirmOrder} htmlType='button' size='medium'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}
