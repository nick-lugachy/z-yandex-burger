import { createSlice } from '@reduxjs/toolkit';

import { requestGET } from '../utils';
const ep = `ingredients`;

const initialState = {
	data: null,
	loading: false,
	hasError: false,
	errorTxt: null,
};

const slice = createSlice({
	name: { ep },
	initialState,
	reducers: {
		ingredientsFetching: (state) => {
			state.loading = true;
			state.hasError = false;
			state.errorTxt = null;
		},
		ingredientsFetched: (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.hasError = false;
		},
		ingredientsFetchingError: (state, action) => {
			state.loading = false;
			state.hasError = true;
			state.errorTxt = action.payload.error;
		},
	},
});

export const fetchIngredients = () => (dispatch) => {
	dispatch(ingredientsFetching());
	return requestGET(ep)
		.then((data) => dispatch(ingredientsFetched(data.data)))
		.catch((err) => {
			dispatch(
				ingredientsFetchingError('большая Ошибка при загрузке данных...')
			);
		});
};

export const ingredients = slice.reducer;

export const {
	ingredientsFetching,
	ingredientsFetched,
	ingredientsFetchingError,
} = slice.actions;

export default ingredients;
