import { createSlice } from '@reduxjs/toolkit';
const url = ' https://norma.nomoreparties.space/api/orders';

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
		order_updAmount: (state, action) => {
			state.amount = action.payload;
		},

		order_updateArr: (state, action) => {
			state.ingredientArr = action.payload;
		},

		order_showDlg: (state, action) => {
			state.ingredient = action.payload;
			state.showDlg = true;
		},

		order_closeDlg: (state) => {
			state.ingredient = null;
			state.showDlg = false;
		},

		order_Fetching: (state) => {
			state.loading = true;
			state.hasError = false;
			state.orderId = 'WAIT..';
			state.description = 'Ожидаем подтверждения заказа..';
			state.errorTxt = null;
		},
		order_Fetched: (state, action) => {
			state.orderId = action.payload.order.number;
			state.description = 'Ваш заказ начали готовить';
			state.loading = false;
			state.hasError = false;
		},
		order_FetchingError: (state, action) => {
			state.loading = false;
			state.orderId = 'ERROR';
			state.hasError = true;
			state.description = action.payload.error;
		},
	},
});

export function order_fillArr() {
	return (dispatch, getState) => {
		const state = getState();
		const burger = state.burgerConstructor;

		let arr = [];
		arr.push(burger.bun._id);
		burger.ingredients.map((I) => arr.push(I._id));
		arr.push(burger.bun._id);

		dispatch(order_updateArr(arr));
	};
}

export const order_create = () => (dispatch, getState) => {
	dispatch(order_fillArr());
	dispatch(order_Fetching());

	const state = getState();

	return fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ingredients: state.order.ingredientArr }),
	})
		.then((res) => {
			if (res && res.ok) {
				return res.json();
			} else {
				console.log(res);
				throw new Error('Ошибка при загрузке данных...');
			}
		})
		.then((data) => {
			console.log(data);
			dispatch(order_Fetched(data));
		})

		.catch((err) => {
			dispatch(order_FetchingError('большая Ошибка при загрузке данных...'));
		});
};

export const order = slice.reducer;

export const {
	order_updAmount,
	order_showDlg,
	order_closeDlg,
	order_updateArr,
	order_Fetching,
	order_Fetched,
	order_FetchingError,
} = slice.actions;

export default order;
