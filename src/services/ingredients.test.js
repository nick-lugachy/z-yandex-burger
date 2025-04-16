import {
	ingredientsFetching,
	ingredientsFetched,
	ingredientsFetchingError,
	ingredients,
	initialState,
} from './ingredients';

import { data } from '../app/data.js';

describe('ingredients reducer', () => {
	it('should return the initial state', () => {
		expect(ingredients(undefined, {})).toEqual({
			...initialState,
		});
	});

	it('should handle ingredientsFetching', () => {
		expect(
			ingredients(undefined, {
				type: ingredientsFetching,
			})
		).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should handle ingredientsFetched', () => {
		expect(
			ingredients(undefined, {
				type: ingredientsFetched,
				payload: data,
			})
		).toEqual({
			...initialState,
			data: data,
		});
	});

	it('should handle ingredientsFetchingError', () => {
		expect(
			ingredients(undefined, {
				type: ingredientsFetchingError,
				payload: { error: 'some error' },
			})
		).toEqual({
			...initialState,
			hasError: true,
			errorTxt: 'some error',
		});
	});
});
