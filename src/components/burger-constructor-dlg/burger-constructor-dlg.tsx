import styles from './burger-constructor-dlg.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { orderCreate } from '../../services/order';

import { useEffect } from 'react';
import {
	RootState,
	AppDispatch,
	useSelectorTp,
	useDispatchTp,
} from '../../index';

export const FinishOrderDlg = () => {
	const order = useSelectorTp((state) => state.order);
	const dispatch = useDispatchTp();

	useEffect(() => dispatch(orderCreate()), []);

	return (
		<>
			<p className='text text_type_digits-large'>{order.orderId}</p>
			<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
			<CheckMarkIcon type='primary' className={'m-15 ' + styles.largeIcon} />
			<p className='text text_type_main-default'>{order.description}</p>
			<p className='text text_type_main-default text_color_inactive mt-2 mb-20'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
};
