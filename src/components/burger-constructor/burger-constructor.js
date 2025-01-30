import { useState } from 'react';
import styles from './burger-constructor.module.css';
import { FinishOrderDlg } from '../burger-constructor-dlg/burger-constructor-dlg.js';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../../components/modal/modal.js';

export function BurgerConstructor(props) {
	const [modalVisible, showModal] = useState(false);

	if (props.bun === null) return <div />;

	return (
		<section className={styles.section}>
			<>
				<ConstructorElement
					type='top'
					isLocked={true}
					text={props.bun.name + ' (Верх)'}
					price={props.bun.price}
					thumbnail={props.bun.image_mobile}
				/>

				<div className={styles.scrollSection}>
					{props.ingredients.map((item) => (
						<div key={item._id} className={styles.elementContainer}>
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image_mobile}
							/>
						</div>
					))}
				</div>

				<ConstructorElement
					type='bottom'
					isLocked={true}
					text={props.bun.name + ' (Низ)'}
					price={props.bun.price}
					thumbnail={props.bun.image_mobile}
				/>
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

import PropTypes from 'prop-types';
import { ingredientType } from '../ingredient-type.js';

BurgerConstructor.propTypes = {
	bun: PropTypes.shape(ingredientType),
	ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
};
