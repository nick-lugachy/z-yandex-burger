import { useEffect } from 'react';
import styles from './feed-order-dlg.module.css';

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import {
	RootState,
	AppDispatch,
	useSelectorTp,
	useDispatchTp,
} from '../../index';

import { Iingredient, IFeedOrder } from '../../services/types';
import { fetchOrder, exOrderFetched } from '../../services/feed';

export interface IIng {
	_id: string;
	name: string;
	image_mobile: string;
	price: number;
	qty: number;
}

export function OrderCardDlg() {
	//	let order: IFeedOrder | undefined;
	const orderId: string | undefined = useParams().orderId;

	if (!orderId) return;

	const { orders } = useSelectorTp((state) => state.feed.orders);

	let order = useSelectorTp((state) => state.feed.extraOrder);

	const dispatch = useDispatchTp();

	const ingredients: Array<Iingredient> = useSelectorTp(
		(state) => state.ingredients.data
	);

	useEffect(() => {
		if (!order || order.number != orderId) {
			dispatch(
				exOrderFetched(
					orders
						? orders.find((item: IFeedOrder) => orderId === item.number)
						: undefined
				)
			);
		}

		if (!order) {
			dispatch(fetchOrder('orders/' + orderId));
		}
	}, [order]);

	if (!order || !ingredients) return;

	let summ = 0;
	let ingArr: Array<IIng> = [];

	order.ingredients.map((id: String) => {
		let ing: Iingredient | undefined = ingredients.find(
			(ing: Iingredient) => id === ing._id
		);
		if (!ing) return;

		summ += ing.price;

		const ix = ingArr.findIndex((I) => I._id == (ing ? ing._id : ''));

		if (ix !== -1) {
			ingArr[ix].qty++;
		} else {
			ingArr.push({
				_id: ing._id,
				name: ing.name,
				image_mobile: ing.image_mobile,
				price: ing.price,
				qty: 1,
			});
		}
	});

	const status =
		order.status === 'done'
			? 'Выполнен'
			: order.status === 'pending'
			? 'Готовится'
			: order.status === 'created'
			? 'Создан'
			: order.status;

	const created = new Date(order.createdAt);

	const IngredientIcon = (props: { src: string }) => {
		return (
			<span key={props.src} className={styles.iconGradient}>
				<div className={styles.iconFrame}>
					<div
						className={styles.icon}
						style={{
							backgroundImage: 'url(' + props.src + ')',
						}}></div>
				</div>
			</span>
		);
	};

	return (
		<div className={styles.orderCard}>
			<p
				style={{ textAlign: 'center' }}
				className='text text_type_digits-default'>
				#{order.number}
			</p>

			<p className='mt-10text text_type_main-medium'>{order.name}</p>

			<p
				style={
					order.status === 'done'
						? { color: 'var(--colors-interface-success)' }
						: {}
				}
				className='mt-3  text text_type_main-small'>
				{status}
			</p>
			<p className='mt-15  mb-4 text text_type_main-medium'>Состав:</p>

			<div className={styles.burgerContent}>
				{ingArr.map((item: IIng) => {
					return (
						<div key={item._id} className={styles.ingredient}>
							<IngredientIcon src={item.image_mobile} />
							<p
								style={{ textAlign: 'left', flexGrow: '1' }}
								className='m-4  text text_type_main-default'>
								{item.name}
							</p>
							<p
								style={{ textAlign: 'right', width: '100px' }}
								className='text text_type_digits-default'>
								{item.qty + ' x ' + item.price}
							</p>
							<CurrencyIcon type='primary' className='ml-2' />
						</div>
					);
				})}
			</div>
			<div className={styles.bottom}>
				<FormattedDate date={created} className='text_color_inactive' />

				<span className={styles.amountFrame}>
					<p className='text text_type_digits-default'>{summ}</p>
					<CurrencyIcon type='primary' className='ml-2' />
				</span>
			</div>
		</div>
	);
}
