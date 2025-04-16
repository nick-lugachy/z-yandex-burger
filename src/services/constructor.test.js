import {
	burgerConstructor,
	addIngredient,
	remIngredient,
	clearIngredient,
	initialState,
} from './constructor.ts';

import { sause, bun } from '../app/data.js';

describe('burgerConstructor reducer', () => {
	it('should return the initial state', () => {
		expect(burgerConstructor(undefined, {})).toEqual({
			...initialState,
		});
	});

	it('should handle addIngredient add bun', () => {
		expect(
			burgerConstructor(undefined, {
				type: addIngredient,
				payload: {
					ingredient: bun,
					destGuid: 'top',
				},
			})
		).toEqual({
			...initialState,
			bun: bun,
		});
	});

	it('should handle addIngredient addIngredient', () => {
		expect(
			burgerConstructor(
				{
					bun: bun,
					ingredients: [],
				},
				{
					type: addIngredient,
					payload: {
						ingredient: sause,
						destGuid: 'top',
					},
				}
			)
		).toEqual({
			bun: bun,
			ingredients: [sause],
		});
	});

	it('should handle remIngredient', () => {
		expect(
			burgerConstructor(
				{
					bun: bun,
					ingredients: [sause],
				},
				{
					type: remIngredient,
					payload: '4644e6ed-02b9-4b77-bc48-82b5ba85f318',
				}
			)
		).toEqual({
			...initialState,
			bun: bun,
		});
	});

	it('should handle clearIngredient', () => {
		expect(
			burgerConstructor(
				{
					bun: bun,
					ingredients: [sause],
				},
				{
					type: clearIngredient,
				}
			)
		).toEqual({
			...initialState,
		});
	});
});
