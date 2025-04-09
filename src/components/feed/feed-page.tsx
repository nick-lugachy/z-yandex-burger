import { Feed } from './feed';
import styles from './feed.module.css';

import {
	RootState,
	AppDispatch,
	useSelectorTp,
	useDispatchTp,
} from '../../index';
import { IFeedOrder } from '../../services/types';

export const FeedPage = () => {
	const { success, orders, total, totalToday } = useSelectorTp(
		(state) => state.feed.orders
	);

	const StatusView = (props: { status?: string }) => {
		return (
			<div>
				<p className='mb-6  text text_type_main-medium'>
					{props.status === 'done' ? 'Готовы' : 'В работе'}
				</p>
				<div className={styles.statusView}>
					{success &&
						orders.map(
							(order: IFeedOrder) =>
								order.status === props.status && (
									<p
										key={order._id}
										className='text text_type_digits-default '
										style={
											props.status === 'done'
												? { color: 'var(--colors-interface-success)' }
												: {}
										}>
										{order.number}
									</p>
								)
						)}
				</div>
			</div>
		);
	};

	return (
		<main>
			<p className='mt-6  text text_type_main-large'>Лента заказов</p>
			<div className={styles.main}>
				<Feed />
				<div>
					<div className={styles.statusSection}>
						<StatusView status={'done'} />
						<StatusView status={'pending'} />
					</div>
					<p className='mt-15  text text_type_main-medium'>
						Выполнено за все время:
					</p>
					<p className='text text_type_digits-large'>{total}</p>
					<p className='mt-15  text text_type_main-medium'>
						Выполнено за сегодня:
					</p>
					<p className='text text_type_digits-large'>{totalToday}</p>
					<section></section>
				</div>
			</div>
		</main>
	);
};
