import { useEffect } from 'react';
import styles from './feed.module.css';

import { connect, disconnect, onMessage } from '../../services/feed';

import { OrderCard } from '../feed-order-card/feed-order-card';

import {
	RootState,
	AppDispatch,
	useSelectorTp,
	useDispatchTp,
} from '../../index';

import { IFeedOrder, IFeedData } from '../../services/types';

let ep: string = ``;

export function Feed(props: { showByUser?: boolean }) {
	ep = props.showByUser ? `` : `/all`;

	const { success, orders } = useSelectorTp((state) => state.feed.orders);

	const dispatch = useDispatchTp();

	useEffect(() => {
		dispatch(connect(ep));
		return () => {
			dispatch(disconnect());
		};
	}, []);

	let i = 0;
	let summ = 0;

	return (
		<div className={styles.orderList}>
			{success &&
				orders.map((order: IFeedOrder) => (
					<OrderCard
						order={order}
						key={order._id}
						showStatus={props.showByUser ?? false}
					/>
				))}
		</div>
	);
}
