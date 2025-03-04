import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useRef } from 'react';
import styles from './profile.module.css';

import { Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { profileRegUser, setEmail, setName } from '../services/profile.js';

import { useForm } from '../hooks/useForm';

export function Register() {
	const { authorized } = useSelector((store) => store.profile);

	const { values, handleChange, setValues } = useForm({
		email: '',
		name: '',
		password: '',
	});

	if (authorized) {
		return <Navigate to='/profile' replace />;
	}

	const dispatch = useDispatch();

	const { email, name, loading, errorTxt } = useSelector(
		(store) => store.profile
	);

	//	const [name, setName] = useState('');
	//	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const refName = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(profileRegUser(values));
	};

	return (
		<form onSubmit={handleSubmit} className={styles.main}>
			<div className={styles.section}>
				<p className='m-4 text text_type_main-medium'>Регистрация</p>

				<Input
					name={'name'}
					placeholder={'Имя'}
					type={'text'}
					onChange={handleChange}
					value={values.name}
					disabled={loading}
					size={'default'}
					extraClass='m-3'
				/>

				<EmailInput
					name={'email'}
					placeholder='Логин'
					onChange={handleChange}
					value={values.email}
					disabled={loading}
					extraClass='m-3'
				/>

				<PasswordInput
					name={'password'}
					placeholder='Пароль'
					onChange={handleChange}
					value={values.password}
					disabled={loading}
					error={errorTxt !== ''}
					errorText={errorTxt}
					extraClass='m-3'
				/>

				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					disabled={loading}
					extraClass='mt-3'>
					Зарегистрироваться
				</Button>

				<p className='mt-20 text text_type_main-small'>
					Уже зарегистрированы? <a href='/login'>войти</a>
				</p>
			</div>
		</form>
	);
}
