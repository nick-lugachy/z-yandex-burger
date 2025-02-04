import styles from './burger-constructor-dlg.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const FinishOrderDlg = () => (
	<>
		<p className='text text_type_digits-large'>34567</p>
		<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
		<CheckMarkIcon className={'m-15 ' + styles.largeIcon} />
		<p className='text text_type_main-default'>Ваш заказ начали готовить</p>
		<p className='text text_type_main-default text_color_inactive mt-2 mb-20'>
			Дождитесь готовности на орбитальной станции
		</p>
	</>
);
