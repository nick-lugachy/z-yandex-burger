import styles from './burger-constructor-dlg.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from 'react-redux';

export const FinishOrderDlg = () => {
	const order = useSelector((store) => store.order);

	return (
		<>
			<p className='text text_type_digits-large'>{order.orderId}</p>
			<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
			<CheckMarkIcon className={'m-15 ' + styles.largeIcon} />
			<p className='text text_type_main-default'>{order.description}</p>
			<p className='text text_type_main-default text_color_inactive mt-2 mb-20'>
				Дождитесь готовности на орбитальной станции
			</p>
		</>
	);
};
