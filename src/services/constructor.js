import { createSlice } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';

const initialState = {
	bun: null,
	ingredients: [],
};

const slice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		addIngredient: (state, action) => {
			const { ingredient, destGuid } = action.payload;
			if (ingredient.type === 'bun') {
				state.bun = ingredient;
			} else {
				let newMap = [];
				let inserted = false;

				if (destGuid === 'top') inserted = newMap.push(ingredient);

				state.ingredients.map((Item) => {
					if (Item.guid !== ingredient.guid) newMap.push(Item);
					if (Item.guid === destGuid) inserted = newMap.push(ingredient);
				});

				if (!inserted) newMap.push(ingredient);
				state.ingredients = newMap;
			}
		},

		clearIngredient: (state) => {
			state.ingredients = [];
			state.bun = null;
		},

		remIngredient: (state, action) => {
			state.ingredients = state.ingredients.filter(
				(I) => I.guid !== action.payload
			);
		},
	},
});

export function InsertIngredientAfter(id, guid, destGuid) {
	return (dispatch, getState) => {
		const state = getState();
		const ingArr = state.ingredients.data;

		guid = guid ?? uuidv4();
		const ingredient = { ...ingArr.find((I) => I._id === id), guid };

		dispatch(addIngredient({ ingredient, destGuid }));
	};
}
export const burgerConstructor = slice.reducer;

export const { addIngredient, remIngredient, clearIngredient } = slice.actions;

export default burgerConstructor;
