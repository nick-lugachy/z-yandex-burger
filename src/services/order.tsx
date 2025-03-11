import { createSlice } from '@reduxjs/toolkit';

import { clearIngredient } from './constructor';
const ep = `orders`;

import { requestPOST, FetchWithToken } from '../utils';

import { IBurgerArr, IburgerElement, Iingredient } from '../services/types';
import { RootState, AppDispatch } from '../index';

const initialState = {
	showDlg: false,
	orderId: '',
	loading: true,
	hasError: false,
	description: '',
	ingredientArr: [],
	amount: 0,
};

const slice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		orderUpdAmount: (state, action) => {
			state.amount = action.payload;
		},

		orderUpdateArr: (state, action) => {
			state.ingredientArr = action.payload;
		},

		orderFetching: (state) => {
			state.loading = true;
			state.hasError = false;
			state.orderId = 'WAIT..';
			state.description = 'Ожидаем подтверждения заказа..';
		},
		orderFetched: (state, action) => {
			state.orderId = action.payload.order.number;
			state.description = 'Ваш заказ начали готовить';
			state.loading = false;
			state.hasError = false;
		},
		orderFetchingError: (state, action) => {
			state.loading = false;
			state.orderId = 'ERROR';
			state.hasError = true;
			state.description = action.payload;
		},
	},
});

export function orderFillArr() {
	return (dispatch: AppDispatch, getState: Function) => {
		const state = getState();
		const burger = state.burgerConstructor;

		let arr = [];
		if (burger.bun) {
			arr.push(burger.bun._id);
			burger.ingredients.map((I: IburgerElement) => arr.push(I._id));
			arr.push(burger.bun._id);
		}

		dispatch(orderUpdateArr(arr));
	};
}

export const orderCreate =
	() => (dispatch: AppDispatch, getState: Function) => {
		dispatch(orderFillArr());
		dispatch(orderFetching());

		const state = getState();

		FetchWithToken(ep, 'POST', { ingredients: state.order.ingredientArr })
			.then((data) => {
				dispatch(orderFetched(data));
				dispatch(clearIngredient());
			})
			.catch((err) => {
				dispatch(
					orderFetchingError(
						err.message + ' Большая Ошибка при загрузке данных...'
					)
				);
			});
	};

export const order = slice.reducer;

export const {
	orderUpdAmount,
	orderUpdateArr,
	orderFetching,
	orderFetched,
	orderFetchingError,
} = slice.actions;

export default order;
