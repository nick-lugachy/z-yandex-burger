import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useRef, useEffect } from 'react';
import { Routes, Route, useMatch, useNavigate, Link } from 'react-router-dom';

import styles from './profile.module.css';

import {
	getUserInfo,
	patchUserInfo,
	profileLogout,
	setName,
	setEmail,
} from '../services/profile';

import { useSelector, useDispatch } from 'react-redux';

import { useForm } from '../hooks/useForm';
import { RootState, AppDispatch } from '../index';

export function Profile() {
	const { email, name, loading, errorTxt } = useSelector(
		(store: RootState) => store.profile
	);

	const dispatch = useDispatch<AppDispatch>();
	const refName = useRef<HTMLInputElement>(null);

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
		if (refName.current) {
			refName.current.disabled = false;
			setValues({ ...values, disabled: false });
			refName.current.focus();
		}
	};

	const navigate = useNavigate();
	const isHistoryPath = useMatch('/profile/history/*') != null;
	const ActiveMenu = (enable: boolean) => {
		return enable
			? { cursor: 'pointer', color: 'var(--text-primary-color)' }
			: { cursor: 'pointer', color: 'var(--text-inactive-color)' };
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(setName(values.name));
		dispatch(setEmail(values.email));
		dispatch(patchUserInfo(values.password));

		setValues({ ...values, password: '' });
	};

	return (
		<form onSubmit={handleSubmit} className={styles.profileGrid}>
			<div className={styles.leftMenu}>
				<Link
					to='/profile'
					className='m-4 text text_type_main-medium'
					style={ActiveMenu(!isHistoryPath)}>
					Профиль
				</Link>
				<Link
					to='/profile/history'
					className='m-4 text text_type_main-medium'
					style={ActiveMenu(isHistoryPath)}>
					История заказов
				</Link>
				<Link
					to='/profile'
					className='m-4 text text_type_main-medium'
					onClick={() => dispatch(profileLogout())}
					style={ActiveMenu(false)}>
					Выход
				</Link>
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
