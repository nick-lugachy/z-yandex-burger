import { createSlice } from '@reduxjs/toolkit';

const url = `https://norma.nomoreparties.space/api/ingredients`;

const initialState = {
	data: null,
	loading: false,
	hasError: false,
	errorTxt: null,
};

const slice = createSlice({
	name: 'ingredients',
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
	return fetch(url)
		.then((res) => {
			if (res && res.ok) {
				return res.json();
			} else {
				throw new error('Ошибка при загрузке данных...');
			}
		})
		.then((data) => {
			dispatch(ingredientsFetched(data.data));
		})

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
