import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useRef, useEffect } from 'react';
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

import {useForm} from '../hooks/useForm';

export function Profile() {
	const { email, name, loading, errorTxt } = useSelector(
		(store) => store.profile
	);

	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(true);
	const [password, setPassword] = useState('');
	const refName = useRef();

	const {values, handleChange, setValues} = useForm({email, name, password: '', disabled:true});

	useEffect(() => {
		dispatch(getUserInfo());
	}, []);
	const onIconClick = () => {
		refName.current.disabled = false;
		setDisabled(false);
		refName.current.focus();
	};

	const navigate = useNavigate();
	const isHistoryPath = useMatch('/profile/history/*');
	const ActiveMenu = (enable) => {
		return enable
			? { cursor: 'pointer', color: 'var(--text-primary-color)' }
			: { cursor: 'pointer', color: 'var(--text-inactive-color)' };
	};

	return (
		<div className={styles.profileGrid}>
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
								onChange={(e) => dispatch(setName(e.target.value))}
								onBlur={() => setDisabled(true)}
								icon={'EditIcon'}
								disabled={disabled}
								value={name}
								error={false}
								ref={refName}
								onIconClick={onIconClick}
								errorText={'Ошибка'}
								size={'default'}
								extraClass='m-3'
							/>

							<EmailInput
								name={'email'}
								onChange={(e) => dispatch(setEmail(e.target.value))}
								value={email}
								placeholder='Логин'
								isIcon={true}
								//								ref={refEmail}
								extraClass='m-3'
							/>

							<PasswordInput
								name={'password'}
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								placeholder='Пароль'
								icon={'EditIcon'}
								//								ref={refPass}
								extraClass='m-3'
							/>
							<span>
								<Button
									htmlType='button'
									type='primary'
									size='medium'
									disabled={loading}
									extraClass='m-10'
									onClick={() => dispatch(getUserInfo())}>
									Отмена
								</Button>

								<Button
									htmlType='button'
									type='primary'
									size='medium'
									disabled={
										loading ||
										password == '' ||
										//										refPass.error ||
										//									refEmail.error ||
										!refName.success
									}
									extraClass='m-10'
									onClick={() => {
										dispatch(patchUserInfo(password));
										setPassword('');
									}}>
									Сохранить
								</Button>
							</span>
						</div>
					}
				/>
				<Route path='history' element={<h1> HISTORY </h1>} />
			</Routes>
		</div>
	);
}
