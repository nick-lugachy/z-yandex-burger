import {
	burgerConstructor,
	addIngredient,
	remIngredient,
	clearIngredient,
} from './constructor.ts';

const sause = {
	_id: '643d69a5c3f7b9001cfa0943',
	name: 'Соус фирменный Space Sauce',
	type: 'sauce',
	proteins: 50,
	fat: 22,
	carbohydrates: 11,
	calories: 14,
	price: 80,
	image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
	__v: 0,
	guid: '4644e6ed-02b9-4b77-bc48-82b5ba85f318',
};

const bun = {
	_id: '643d69a5c3f7b9001cfa093d',
	name: 'Флюоресцентная булка R2-D3',
	type: 'bun',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/bun-01.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
	__v: 0,
	guid: 'af367d22-6619-4280-ac15-e717f416ba2b',
};

describe('burgerConstructor reducer', () => {
	it('should return the initial state', () => {
		expect(burgerConstructor(undefined, {})).toEqual({
			bun: null,
			ingredients: [],
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
			bun: bun,
			ingredients: [],
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
			bun: bun,
			ingredients: [],
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
			bun: null,
			ingredients: [],
		});
	});
});
