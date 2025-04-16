import {
	ingredientsFetching,
	ingredientsFetched,
	ingredientsFetchingError,
	ingredients,
} from './ingredients';

import { data } from '../app/data.js';

describe('ingredients reducer', () => {
	it('should return the initial state', () => {
		expect(ingredients(undefined, {})).toEqual({
			data: [],
			loading: false,
			hasError: false,
			errorTxt: null,
		});
	});

	it('should handle ingredientsFetching', () => {
		expect(
			ingredients(undefined, {
				type: ingredientsFetching,
			})
		).toEqual({
			data: [],
			loading: true,
			hasError: false,
			errorTxt: null,
		});
	});

	it('should handle ingredientsFetched', () => {
		expect(
			ingredients(undefined, {
				type: ingredientsFetched,
				payload: data,
			})
		).toEqual({
			data: data,
			loading: false,
			hasError: false,
			errorTxt: null,
		});
	});

	it('should handle ingredientsFetchingError', () => {
		expect(
			ingredients(undefined, {
				type: ingredientsFetchingError,
				payload: { error: 'some error' },
			})
		).toEqual({
			data: [],
			loading: false,
			hasError: true,
			errorTxt: 'some error',
		});
	});
});
