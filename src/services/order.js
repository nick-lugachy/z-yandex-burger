import { createSlice } from '@reduxjs/toolkit';

import { clearIngredient } from './constructor';
const ep = `orders`;

import { requestPOST } from '../utils';

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

		orderShowDlg: (state, action) => {
			state.ingredient = action.payload;
			state.showDlg = true;
		},

		orderCloseDlg: (state) => {
			state.ingredient = null;
			state.showDlg = false;
		},

		orderFetching: (state) => {
			state.loading = true;
			state.hasError = false;
			state.orderId = 'WAIT..';
			state.description = 'Ожидаем подтверждения заказа..';
			state.errorTxt = null;
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
			state.description = action.payload.error;
		},
	},
});

export function orderFillArr() {
	return (dispatch, getState) => {
		const state = getState();
		const burger = state.burgerConstructor;

		let arr = [];
		arr.push(burger.bun._id);
		burger.ingredients.map((I) => arr.push(I._id));
		arr.push(burger.bun._id);

		dispatch(orderUpdateArr(arr));
	};
}

export const orderCreate = () => (dispatch, getState) => {
	dispatch(orderFillArr());
	dispatch(orderFetching());

	const state = getState();

	return requestPOST(ep, { ingredients: state.order.ingredientArr })
		.then((data) => {
			dispatch(orderFetched(data));
			dispatch(clearIngredient());
		})
		.catch((err) => {
			dispatch(
				orderFetchingError({ err } + ' Большая Ошибка при загрузке данных...')
			);
		});
};

export const order = slice.reducer;

export const {
	orderUpdAmount,
	orderShowDlg,
	orderCloseDlg,
	orderUpdateArr,
	orderFetching,
	orderFetched,
	orderFetchingError,
} = slice.actions;

export default order;
