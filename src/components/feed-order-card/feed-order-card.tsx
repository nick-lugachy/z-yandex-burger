//import { Key } from 'react';
import styles from './feed-order-card.module.css';

import {
	FormattedDate,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useLocation, Link } from 'react-router-dom';

import { useSelectorTp } from '../../index';

import { Iingredient, IFeedOrder } from '../../services/types';

const ingMax = 6;

export function OrderCard({
	order,
	showStatus,
}: {
	order: IFeedOrder;
	showStatus: boolean;
}) {
	const location = useLocation();

	const ingredients: Array<Iingredient> = useSelectorTp(
		(state) => state.ingredients.data
	);

	let i = 0;
	let summ = 0;
	let ingExtra = '';
	const imgArr: Array<string> = [];

	order.ingredients.map((id: string) => {
		const ing: Iingredient | undefined = ingredients.find(
			(ing: Iingredient) => id === ing._id
		);
		if (!ing) return;

		i++;
		summ += ing.price;
		if (i <= ingMax) {
			imgArr.unshift(ing.image_mobile);
		} else {
			imgArr[0] = ingredients[ingredients.length - 1].image_mobile;
		}
	});

	if (i > ingMax) {
		ingExtra = '+' + String(i - ingMax + 1);
		i = ingMax;
	}

	const status =
		order.status === 'done'
			? 'Выполнен'
			: order.status === 'pending'
			? 'Готовится'
			: order.status === 'created'
			? 'Создан'
			: order.status;

	const created = new Date(order.createdAt);

	return (
		<Link
			key={order._id}
			to={`${location.pathname}/${order.number}`}
			state={{ background: location }}>
			<div className={styles.orderCard}>
				<div className={styles.orderId}>
					<p className='text text_type_digits-default'>#{order.number}</p>
					<FormattedDate date={created} className='text_color_inactive' />
				</div>
				<p className='mt-6  text text_type_main-medium'>{order.name}</p>
				{showStatus && (
					<p className='mt-2  text text_type_main-small'>{status}</p>
				)}
				<div className={styles.contentContainer}>
					{imgArr.map((src: string) => {
						i--;
						return (
							<span
								key={order._id + String(i)}
								style={{ left: i * 48 }}
								className={styles.iconGradient}>
								<div className={styles.iconFrame}>
									<div
										className={styles.icon}
										style={{
											backgroundImage: 'url(' + src + ')',
										}}>
										{i == ingMax - 1 && (
											<div
												className={
													styles.ingExtra + ' text text_type_main-small'
												}>
												{ingExtra}
											</div>
										)}
									</div>
								</div>
							</span>
						);
					})}
					<span style={{ right: 0 }} className={styles.amountFrame}>
						<p className='text text_type_digits-default'>{summ}</p>
						<CurrencyIcon type='primary' className='ml-2' />
					</span>
				</div>
			</div>
		</Link>
	);
}
