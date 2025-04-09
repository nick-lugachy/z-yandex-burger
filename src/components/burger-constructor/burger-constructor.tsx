import { useMemo, useRef, LegacyRef } from 'react';
import styles from './burger-constructor.module.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag, useDrop } from 'react-dnd';

import { useNavigate } from 'react-router-dom';

import {
	remIngredient,
	InsertIngredientAfter,
} from '../../services/constructor';

import { IBurgerArr, IburgerElement } from '../../services/types';
import {
	RootState,
	AppDispatch,
	useSelectorTp,
	useDispatchTp,
} from '../../index';

interface IdragItem {
	id: string;
	guid: string;
}

function Element(props: IburgerElement) {
	const dispatch = useDispatchTp();

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: {
			id: props._id,
			guid: props.guid,
		},
	});

	const [{ isHover, delta }, dropRef] = useDrop({
		accept: 'ingredient',
		drop(item: IdragItem) {
			dispatch(
				InsertIngredientAfter(item.id, item.guid, props.tp ?? props.guid ?? '')
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

	const ref = useRef<HTMLDivElement>(null);
	const dndRef = dragRef(dropRef(ref));

	return (
		<div
			ref={dndRef as LegacyRef<HTMLDivElement>}
			className={styles.elementContainer}
			style={{ paddingBottom, paddingTop, marginLeft }}>
			{props._id ? (
				<>
					{!props.tp && <DragIcon type='primary' />}
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
						price={props.price ?? 0}
						thumbnail={props.image_mobile ?? ''}
						handleClose={() => dispatch(remIngredient(props.guid))}
					/>
				</>
			) : (
				<div className={styles.dummy} />
			)}
		</div>
	);
}

export function BurgerConstructor() {
	const navigate = useNavigate();

	const confirmOrder = () => {
		if (data.bun === null) return;
		//		dispatch(orderCreate());
		navigate('/order');
		//		openModal();
	};

	const data: IBurgerArr = useSelectorTp((state) => state.burgerConstructor);

	const orderAmount = useMemo(() => {
		let summ = 2 * (data.bun && data.bun.price ? data.bun.price : 0);
		data.ingredients.map((item: IburgerElement) => (summ += item.price ?? 0));
		return summ;
	}, [data]);

	return (
		<section className={styles.section}>
			<>
				<Element {...data.bun} tp='top' />
				<div className={styles.scrollSection}>
					{data.ingredients[0] ? (
						data.ingredients.map((item: IburgerElement) => (
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
				<CurrencyIcon className={styles.icon} type='primary' />
				<Button onClick={confirmOrder} htmlType='button' size='medium'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}
