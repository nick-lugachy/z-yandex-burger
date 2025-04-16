import {
	order,
	orderUpdAmount,
	orderUpdateArr,
	orderFetching,
	orderFetched,
	orderFetchingError,
	initialState,
} from './order';

describe('Order Service', () => {
	it('should return the initial state', () => {
		expect(order(undefined, {})).toEqual({
			...initialState,
		});
	});

	it('should handle orderFetching', () => {
		expect(
			order(undefined, {
				type: orderFetching,
			})
		).toEqual({
			...initialState,
			orderId: 'WAIT..',
			loading: true,
			description: 'Ожидаем подтверждения заказа..',
		});
	});

	it('should handle orderFetched', () => {
		expect(
			order(undefined, {
				type: orderFetched,
				payload: { order: { number: '123' } },
			})
		).toEqual({
			...initialState,
			orderId: '123',
			loading: false,
			description: 'Ваш заказ начали готовить',
		});
	});

	it('should handle orderFetchingError', () => {
		expect(
			order(undefined, {
				type: orderFetchingError,
				payload: 'some error',
			})
		).toEqual({
			...initialState,
			orderId: 'ERROR',
			loading: false,
			hasError: true,
			description: 'some error',
		});
	});
	it('should handle orderUpdAmount', () => {
		expect(
			order(undefined, {
				type: orderUpdAmount,
				payload: 123,
			})
		).toEqual({
			...initialState,
			amount: 123,
		});
	});

	it('should handle orderUpdateArr', () => {
		expect(
			order(undefined, {
				type: orderUpdateArr,
				payload: [123, 456, 789],
			})
		).toEqual({
			...initialState,
			ingredientArr: [123, 456, 789],
		});
	});
});
