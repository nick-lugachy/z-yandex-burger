import {
	EmailInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import { profileSendEmail, setEmail } from '../services/profile';

import { useSelectorTp, useDispatchTp } from '../index';

export function ForgotPassword() {
	const { email, loading, errorTxt, authorized } = useSelectorTp(
		(state) => state.profile
	);

	const dispatch = useDispatchTp();
	const navigate = useNavigate();

	if (authorized) {
		return <Navigate to='/profile' replace />;
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			profileSendEmail(() =>
				navigate('/reset-password', { state: { email: email }, replace: true })
			)
		);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.main}>
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
				/>

				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					disabled={loading}
					extraClass='mt-3'>
					Восстановить
				</Button>

				<p className='mt-20 text text_type_main-small'>
					Вспомнили пароль? <Link to='/login'>войти</Link>
				</p>
			</div>
		</form>
	);
}
