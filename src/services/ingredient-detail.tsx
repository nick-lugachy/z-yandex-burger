import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	showDlg: false,
	ingredient: null,
};

const slice = createSlice({
	name: 'ingredientDetail',
	initialState,
	reducers: {
		detailSet: (state, action) => {
			state.ingredient = action.payload;
		},

		detailClear: (state) => {
			state.ingredient = null;
		},

		detailShowDlg: (state, action) => {
			state.ingredient = action.payload;
			state.showDlg = true;
		},

		detailCloseDlg: (state) => {
			state.ingredient = null;
			state.showDlg = false;
		},
	},
});

export const ingredientDetail = slice.reducer;

export const { detailSet, detailClear, detailShowDlg, detailCloseDlg } =
	slice.actions;

export default ingredientDetail;
