import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useRef } from 'react';
import styles from './profile.module.css';

import { useNavigate, Navigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { profileRegUser, setEmail, setName } from '../services/profile.js';

export function Register() {
	if (localStorage.getItem('refreshToken') !== null) {
		return <Navigate to='/profile' state={{ from: useLocation() }} replace />;
	}

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { email, name, loading, errorTxt } = useSelector(
		(store) => store.profile
	);

	//	const [name, setName] = useState('');
	//	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const refName = useRef();

	return (
		<div className={styles.main}>
			<div className={styles.section}>
				<p className='m-4 text text_type_main-medium'>Регистрация</p>

				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => dispatch(setName(e.target.value))}
					value={name}
					name={'name'}
					disabled={loading}
					size={'default'}
					extraClass='m-3'
				/>

				<EmailInput
					onChange={(e) => dispatch(setEmail(e.target.value))}
					value={email}
					name={'email'}
					disabled={loading}
					placeholder='Логин'
					extraClass='m-3'
				/>

				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					name={'password'}
					disabled={loading}
					error={errorTxt !== ''}
					errorText={errorTxt}
					placeholder='Пароль'
					extraClass='m-3'
				/>

				<Button
					htmlType='button'
					type='primary'
					size='medium'
					disabled={loading}
					onClick={() => dispatch(profileRegUser(password))}
					extraClass='mt-3'>
					Зарегистрироваться
				</Button>

				<p className='mt-20 text text_type_main-small'>
					Уже зарегистрированы? <a href='/login'>войти</a>
				</p>
			</div>
		</div>
	);
}
