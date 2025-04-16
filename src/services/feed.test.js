import {
	feed,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
	exOrderFetched,
	WebsocketStatus,
	initialState,
} from './feed';

import { data } from '../app/data.js';

const sampleOrders = {
	success: true,
	orders: data,
	total: 1024,
	totalToday: 48,
};

describe('feed reducer', () => {
	it('should return the initial state', () => {
		expect(feed(undefined, {})).toEqual({
			...initialState,
		});
	});

	it('should handle onOpen', () => {
		expect(
			feed(undefined, {
				type: onOpen,
			})
		).toEqual({
			...initialState,
			status: WebsocketStatus.ONLINE,
		});
	});

	it('should handle onConnecting', () => {
		expect(
			feed(undefined, {
				type: onConnecting,
			})
		).toEqual({
			...initialState,
			status: WebsocketStatus.CONNECTING,
		});
	});

	it('should handle onClose', () => {
		expect(
			feed(undefined, {
				type: onClose,
			})
		).toEqual({
			...initialState,
		});
	});

	it('should handle onError', () => {
		expect(
			feed(undefined, {
				type: onError,
				payload: 'some error',
			})
		).toEqual({
			...initialState,
			error: 'some error',
		});
	});

	it('should handle onMessage', () => {
		expect(
			feed(undefined, {
				type: onMessage,
				payload: sampleOrders,
			})
		).toEqual({
			...initialState,
			orders: sampleOrders,
		});
	});

	it('should handle exOrderFetched', () => {
		expect(
			feed(undefined, {
				type: exOrderFetched,
				payload: data[0],
			})
		).toEqual({
			...initialState,
			extraOrder: data[0],
		});
	});
});
