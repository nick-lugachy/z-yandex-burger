import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	showDlg: false,
	ingredient: null,
};

const slice = createSlice({
	name: 'ingredientDetail',
	initialState,
	reducers: {
		detail_set: (state, action) => {
			state.ingredient = action.payload;
		},

		detail_clear: (state) => {
			state.ingredient = null;
		},

		detail_showDlg: (state, action) => {
			state.ingredient = action.payload;
			state.showDlg = true;
		},

		detail_closeDlg: (state) => {
			state.ingredient = null;
			state.showDlg = false;
		},
	},
});

export const ingredientDetail = slice.reducer;

export const { detail_set, detail_clear, detail_showDlg, detail_closeDlg } =
	slice.actions;

export default ingredientDetail;
