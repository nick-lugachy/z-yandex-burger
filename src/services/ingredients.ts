import { createSlice } from '@reduxjs/toolkit';

import { requestGET } from '../utils';
import { AppDispatch } from '../index';

const ep = 'ingredients';

export const initialState = {
	data: [],
	loading: false,
	hasError: false,
	errorTxt: null,
};

const slice = createSlice({
	name: ep,
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

export const fetchIngredients = () => (dispatch: AppDispatch) => {
	dispatch(ingredientsFetching());
	return requestGET(ep)
		.then((data) => dispatch(ingredientsFetched(data.data)))
		.catch((err: Error) => {
			dispatch(
				ingredientsFetchingError(
					'большая Ошибка при загрузке данных...' + err.message
				)
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
