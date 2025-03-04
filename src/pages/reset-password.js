import {
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useEffect } from 'react';
import styles from './profile.module.css';

import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { resetPassword, setEmail } from '../services/profile.js';

export function ResetPassword() {
	const { authorized } = useSelector((store) => store.profile);

	if (authorized) {
		return <Navigate to='/profile' replace />;
	}

	const state = useLocation().state;
	const navigate = useNavigate();
	useEffect(() => {
		if (!state || !'email' in state) {
			navigate('/login', { replace: true });
		}
	}, []);

	const [key, setKey] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const handleSubmit =  (e) =>{

		e.preventDefault();

		dispatch(resetPassword(password, key));
		navigate('/login', { replace: true });
	}

	return (
		<form onSubmit={handleSubmit} className={styles.main}>
			<div className={styles.section}>
				<p className='m-4 text text_type_main-medium'>Восстановление пароля</p>

				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					placeholder='Введите новый пароль'
					icon={null}
					extraClass='m-3'
				/>

				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={(e) => setKey(e.target.value)}
					value={key}
					name={'key'}
					size={'default'}
					extraClass='m-3'
				/>

				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mt-3'>
					Сохранить
				</Button>

				<p className='mt-20 text text_type_main-small'>
					Вспомнили пароль? <a href='/login'>войти</a>
				</p>
			</div>
		</form>
	);
}
