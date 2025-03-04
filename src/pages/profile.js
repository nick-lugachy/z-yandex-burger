import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useRef, useEffect } from 'react';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';

import styles from './profile.module.css';

import {
	getUserInfo,
	patchUserInfo,
	profileLogout,
	setName,
	setEmail,
} from '../services/profile.js';

import { useSelector, useDispatch } from 'react-redux';

import { useForm } from '../hooks/useForm';

export function Profile() {
	const { email, name, loading, errorTxt } = useSelector(
		(store) => store.profile
	);

	const dispatch = useDispatch();
	const refName = useRef();

	const { values, handleChange, setValues } = useForm({
		email,
		name,
		password: '',
		disabled: true,
	});

	useEffect(() => {
		dispatch(getUserInfo());
	}, []);

	useEffect(() => {
		setValues({ ...values, email, name });
	}, [email, name]);

	const onIconClick = () => {
		refName.current.disabled = false;
		setValues({ ...values, disabled: false });
		refName.current.focus();
	};

	const navigate = useNavigate();
	const isHistoryPath = useMatch('/profile/history/*');
	const ActiveMenu = (enable) => {
		return enable
			? { cursor: 'pointer', color: 'var(--text-primary-color)' }
			: { cursor: 'pointer', color: 'var(--text-inactive-color)' };
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(setName(values.name));
		dispatch(setEmail(values.email));
		dispatch(patchUserInfo(values.password));

		setValues({ ...values, password: '' });
	};

	return (
		<form onSubmit={handleSubmit} className={styles.profileGrid}>
			<div className={styles.leftMenu}>
				<a
					className='m-4 text text_type_main-medium'
					onClick={() => navigate('/profile')}
					style={ActiveMenu(!isHistoryPath)}>
					Профиль
				</a>
				<a
					className='m-4 text text_type_main-medium'
					onClick={() => navigate('/profile/history')}
					style={ActiveMenu(isHistoryPath)}>
					История заказов
				</a>
				<a
					className='m-4 text text_type_main-medium'
					onClick={() => dispatch(profileLogout())}
					style={ActiveMenu(false)}>
					Выход
				</a>
			</div>

			<Routes>
				<Route
					path=''
					element={
						<div className={styles.section}>
							<Input
								type={'text'}
								placeholder={'Имя'}
								name={'name'}
								onChange={handleChange}
								onBlur={() => setValues({ ...values, disabled: true })}
								icon={'EditIcon'}
								disabled={values.disabled}
								value={values.name}
								ref={refName}
								onIconClick={onIconClick}
								size={'default'}
								extraClass='m-3'
							/>

							<EmailInput
								name={'email'}
								placeholder='Логин'
								onChange={handleChange}
								value={values.email}
								isIcon={true}
								extraClass='m-3'
							/>

							<PasswordInput
								name={'password'}
								placeholder='Пароль'
								onChange={handleChange}
								value={values.password}
								icon={'EditIcon'}
								extraClass='m-3'
							/>
							<span>
								<Button
									htmlType='button'
									type='primary'
									size='medium'
									disabled={loading}
									extraClass='m-10'
									onClick={() =>
										setValues({ ...values, email, name, password: '' })
									}>
									Отмена
								</Button>

								<Button
									htmlType='submit'
									type='primary'
									size='medium'
									disabled={loading || values.password == ''}
									extraClass='m-10'>
									Сохранить
								</Button>
							</span>
						</div>
					}
				/>
				<Route path='history' element={<h1> HISTORY </h1>} />
			</Routes>
		</form>
	);
}
