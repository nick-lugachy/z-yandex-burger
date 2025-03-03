import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useEffect } from 'react';
import styles from './profile.module.css';

import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { profileLogin, setEmail, getUserInfo } from '../services/profile.js';
import { hasStoredToken } from '../utils';

export function Login() {
	useEffect(() => {
		if (hasStoredToken()) {
			dispatch(getUserInfo());
		} //try refresh stored token
	}, []);

	const { email, authorized, loading, errorTxt } = useSelector(
		(store) => store.profile
	);

	const dispatch = useDispatch();

	const state = useLocation().state;
	const navigate = useNavigate();

	useEffect(() => {
		if (authorized) {
			if (state && 'from' in state) {
				navigate(state.from, { replace: true });
			} else {
				navigate('/');
			}
		}
	}, [authorized]);

	const [password, setPassword] = useState('');

	return (
		<div className={styles.main}>
			<div className={styles.section}>
				<p className='m-4 text text_type_main-medium'>Вход</p>

				<EmailInput
					onChange={(e) => dispatch(setEmail(e.target.value))}
					value={email}
					name={'email'}
					placeholder='E-mail'
					disabled={loading}
					extraClass='m-3'
				/>

				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					placeholder='Пароль'
					disabled={loading}
					error={errorTxt !== ''}
					//					errorText={errorTxt}
					extraClass='m-3'
				/>

				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={() => dispatch(profileLogin(password))}
					disabled={loading}
					extraClass='mt-3'>
					Войти
				</Button>

				<p className='mt-20 text text_type_main-small'>
					Вы новый пользователь? <a href='/register'>Зарегистрироваться</a>
				</p>
				<p className='mt-4 text text_type_main-small'>
					Забыли пароль? <a href='/forgot-password'>Восстановить пароль</a>
				</p>
			</div>
		</div>
	);
}
