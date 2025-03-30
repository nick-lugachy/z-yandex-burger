import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useEffect } from 'react';
import styles from './profile.module.css';

import { useNavigate, Link, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { profileLogin } from '../services/profile';

import { useForm } from '../hooks/useForm';
import { RootState, AppDispatch } from '../index';

interface IloginInput {
	email: string;
	password: string;
}

export function Login() {
	const { email, authorized, loading, errorTxt } = useSelector(
		(store: RootState) => store.profile
	);

	const { values, handleChange, setValues } = useForm<IloginInput>({
		email,
		password: '',
	});

	const dispatch = useDispatch<AppDispatch>();

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(profileLogin(values));
	};

	return (
		<form onSubmit={handleSubmit} className={styles.main}>
			<div className={styles.section}>
				<p className='m-4 text text_type_main-medium'>Вход</p>

				<EmailInput
					name={'email'}
					onChange={handleChange}
					value={values.email}
					placeholder='E-mail'
					disabled={loading}
					extraClass='m-3'
				/>

				<PasswordInput
					name={'password'}
					onChange={handleChange}
					value={values.password}
					placeholder='Пароль'
					disabled={loading}
					extraClass='m-3'
				/>

				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					disabled={loading}
					extraClass='mt-3'>
					Войти
				</Button>

				<p className='mt-20 text text_type_main-small'>
					Вы новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
				</p>
				<p className='mt-4 text text_type_main-small'>
					Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
				</p>
			</div>
		</form>
	);
}
