import {
	feed,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
	exOrderFetched,
	WebsocketStatus,
} from './feed';

import { data } from '../app/data.js';

describe('feed reducer', () => {
	it('should return the initial state', () => {
		expect(feed(undefined, {})).toEqual({
			status: WebsocketStatus.OFFLINE,
			orders: { success: false, orders: [], total: 0, totalToday: 0 },
			error: null,
			extraOrder: undefined,
		});
	});

	it('should handle onOpen', () => {
		expect(
			feed(undefined, {
				type: onOpen,
			})
		).toEqual({
			status: WebsocketStatus.ONLINE,
			orders: { success: false, orders: [], total: 0, totalToday: 0 },
			error: null,
			extraOrder: undefined,
		});
	});

	it('should handle onConnecting', () => {
		expect(
			feed(undefined, {
				type: onConnecting,
			})
		).toEqual({
			status: WebsocketStatus.CONNECTING,
			orders: { success: false, orders: [], total: 0, totalToday: 0 },
			error: null,
			extraOrder: undefined,
		});
	});

	it('should handle onClose', () => {
		expect(
			feed(undefined, {
				type: onClose,
			})
		).toEqual({
			status: WebsocketStatus.OFFLINE,
			orders: { success: false, orders: [], total: 0, totalToday: 0 },
			error: null,
			extraOrder: undefined,
		});
	});

	it('should handle onError', () => {
		expect(
			feed(undefined, {
				type: onError,
				payload: 'some error',
			})
		).toEqual({
			status: WebsocketStatus.OFFLINE,
			orders: { success: false, orders: [], total: 0, totalToday: 0 },
			error: 'some error',
			extraOrder: undefined,
		});
	});

	it('should handle onMessage', () => {
		expect(
			feed(undefined, {
				type: onMessage,
				payload: { success: true, orders: data, total: 0, totalToday: 0 },
			})
		).toEqual({
			status: WebsocketStatus.OFFLINE,
			orders: { success: true, orders: data, total: 0, totalToday: 0 },
			error: null,
			extraOrder: undefined,
		});
	});

	it('should handle exOrderFetched', () => {
		expect(
			feed(undefined, {
				type: exOrderFetched,
				payload: data[0],
			})
		).toEqual({
			status: WebsocketStatus.OFFLINE,
			orders: { success: false, orders: [], total: 0, totalToday: 0 },
			error: null,
			extraOrder: data[0],
		});
	});
});
