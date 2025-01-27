import { useState } from 'react';
import styles from './burger-constructor.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../../components/modal/modal.js';

export function BurgerConstructor(props) {
	const [modalVisible, showModal] = useState(false);

	const FinishOrderDlg = () => (
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

	if (props.data === null) return <div />;

	const Element = (props) => (
		<ConstructorElement
			type={props.btnShape}
			isLocked={props.type == 'bun' ? true : false}
			text={props.name}
			price={props.price}
			thumbnail={props.image_mobile}
		/>
	);

	return (
		<section className={styles.section}>
			<>
				<Element {...props.data[0]} btnShape='top' />
				<div className={styles.scrollSection}>
					{props.data.map(
						(Item) =>
							Item.type !== 'bun' && <Element key={Item._id} {...Item} />
					)}
				</div>
				<Element {...props.data[0]} btnShape='bottom' />
			</>
			<div className={styles.total}>
				<p className='text text_type_digits-medium pt-2'>12345</p>
				<CurrencyIcon className={styles.icon} />
				<Button
					onClick={() => showModal(true)}
					htmlType='button'
					type='primary'
					size='medium'>
					Оформить заказ
				</Button>
				<Modal isOpen={modalVisible} onClose={() => showModal(false)}>
					<FinishOrderDlg />
				</Modal>
			</div>{' '}
		</section>
	);
}
