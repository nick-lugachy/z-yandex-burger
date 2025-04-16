import {
	order,
	orderUpdAmount,
	orderUpdateArr,
	orderFetching,
	orderFetched,
	orderFetchingError,
} from './order';

describe('Order Service', () => {
	it('should return the initial state', () => {
		expect(order(undefined, {})).toEqual({
			showDlg: false,
			orderId: '',
			loading: true,
			hasError: false,
			description: '',
			ingredientArr: [],
			amount: 0,
		});
	});

	it('should handle orderFetching', () => {
		expect(
			order(undefined, {
				type: orderFetching,
			})
		).toEqual({
			showDlg: false,
			orderId: 'WAIT..',
			loading: true,
			hasError: false,
			description: 'Ожидаем подтверждения заказа..',
			ingredientArr: [],
			amount: 0,
		});
	});

	it('should handle orderFetched', () => {
		expect(
			order(undefined, {
				type: orderFetched,
				payload: { order: { number: '123' } },
			})
		).toEqual({
			showDlg: false,
			orderId: '123',
			loading: false,
			hasError: false,
			description: 'Ваш заказ начали готовить',
			ingredientArr: [],
			amount: 0,
		});
	});

	it('should handle orderFetchingError', () => {
		expect(
			order(undefined, {
				type: orderFetchingError,
				payload: 'some error',
			})
		).toEqual({
			showDlg: false,
			orderId: 'ERROR',
			loading: false,
			hasError: true,
			description: 'some error',
			ingredientArr: [],
			amount: 0,
		});
	});
	it('should handle orderUpdAmount', () => {
		expect(
			order(undefined, {
				type: orderUpdAmount,
				payload: 123,
			})
		).toEqual({
			showDlg: false,
			orderId: '',
			loading: true,
			hasError: false,
			description: '',
			ingredientArr: [],
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
			showDlg: false,
			orderId: '',
			loading: true,
			hasError: false,
			description: '',
			ingredientArr: [123, 456, 789],
			amount: 0,
		});
	});
});
