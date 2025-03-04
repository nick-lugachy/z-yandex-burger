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

import {useForm} from '../hooks/useForm';

 export function Login() {

	const { email, authorized, loading, errorTxt } = useSelector(
		(store) => store.profile
	);

	const {values, handleChange, setValues} = useForm({email, password: ''});

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

	const handleSubmit =  (e) =>{
		e.preventDefault();
		dispatch(profileLogin(values));
	}
	
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
					error={errorTxt !== ''}
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
					Вы новый пользователь? <a href='/register'>Зарегистрироваться</a>
				</p>
				<p className='mt-4 text text_type_main-small'>
					Забыли пароль? <a href='/forgot-password'>Восстановить пароль</a>
				</p>
			</div>
		</form>
	);
}
