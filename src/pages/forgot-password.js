import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { profileSendEmail, setEmail } from '../services/profile.js';

export function ForgotPassword() {
	const { email, loading, hasError, errorTxt, authorized } = useSelector(
		(store) => store.profile
	);

	if (authorized) {
		return <Navigate to='/profile' replace />;
	}

	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className={styles.main}>
			<div className={styles.section}>
				<p className='m-4 text text_type_main-medium'>Восстановление пароля</p>

				<EmailInput
					onChange={(e) => dispatch(setEmail(e.target.value))}
					value={email}
					name={'email'}
					placeholder='Логин'
					extraClass='m-3'
					errorText={errorTxt}
					disabled={loading}
					error={hasError}
				/>

				<Button
					htmlType='button'
					type='primary'
					size='medium'
					disabled={loading}
					extraClass='mt-3'
					onClick={() =>
						dispatch(
							profileSendEmail(() =>
								navigate(
									'/reset-password',
									{
										state: { email: email },
									},
									{ replace: true }
								)
							)
						)
					}>
					Восстановить
				</Button>

				<p className='mt-20 text text_type_main-small'>
					Вспомнили пароль? <a href='/login'>войти</a>
				</p>
			</div>
		</div>
	);
}
