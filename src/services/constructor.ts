import { createSlice } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';
import { IBurgerArr, IburgerElement, Iingredient } from './types';
import { AppDispatch } from '../index';

const initialState: IBurgerArr = {
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
				const newMap = [];
				let inserted = false;

				if (destGuid === 'top') inserted = newMap.push(ingredient) != 0;

				state.ingredients.map((Item: IburgerElement) => {
					if (Item.guid !== ingredient.guid) newMap.push(Item);
					if (Item.guid === destGuid) inserted = newMap.push(ingredient) != 0;
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

export function InsertIngredientAfter(
	id: string,
	guid: string,
	destGuid: string
) {
	return (dispatch: AppDispatch, getState: Function) => {
		const state = getState();
		const ingArr = state.ingredients.data;

		guid = guid ?? uuidv4();
		const ingredient = {
			...ingArr.find((I: Iingredient) => I._id === id),
			guid,
		};

		dispatch(addIngredient({ ingredient, destGuid }));
	};
}
export const burgerConstructor = slice.reducer;

export const { addIngredient, remIngredient, clearIngredient } = slice.actions;

export default burgerConstructor;
