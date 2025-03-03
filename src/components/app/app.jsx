import { useEffect } from 'react';
import styles from './app.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader } from '../header/header.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';
import { Profile } from '../../pages/profile';
import { Register } from '../../pages/register';
import { Login } from '../../pages/login';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { PrivateRoute } from '../../pages/private-route';
import { IngredientDlg } from '../../components/ingredient-details-dlg/ingredient-details-dlg';
import { FinishOrderDlg } from '../../components//burger-constructor-dlg/burger-constructor-dlg.js';
import { Modal } from '../../components/modal/modal.js';
import fzf from '../../app/assets/fzf.gif';

import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

export const App = () => {
	const dispatch = useDispatch();

	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, []);

	const Main = () => (
		<main className={styles.main}>
			<BurgerIngredients />
			<BurgerConstructor />
		</main>
	);

	const NotFound404 = () => (
		<div className={styles.fzf}>
			<img src={fzf} alt='Страница не найдена' />
			<h1>404 PAGE NOT FOUND</h1>
		</div>
	);
	return (
		<div className={styles.root}>
			<DndProvider backend={HTML5Backend}>
				<AppHeader />
				<>
					<Routes location={background || location}>
						<Route path='/' element={<Main />} />

						<Route
							path='profile/*'
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
						<Route path='forgot-password' element={<ForgotPassword />} />
						<Route path='reset-password' element={<ResetPassword />} />
						<Route path='/ingredients/:ingId' element={<IngredientDlg />} />
						<Route path='*' element={<NotFound404 />} />
						<Route
							path='/order'
							element={
								<PrivateRoute>
									<Modal onClose={handleModalClose}>
										<FinishOrderDlg />
									</Modal>
								</PrivateRoute>
							}
						/>
					</Routes>

					{background && (
						<Routes>
							<Route
								path='/ingredients/:ingId'
								element={
									<Modal onClose={handleModalClose}>
										<IngredientDlg />
									</Modal>
								}
							/>
						</Routes>
					)}
				</>
			</DndProvider>
		</div>
	);
};
