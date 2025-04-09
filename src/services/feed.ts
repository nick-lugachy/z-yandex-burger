import { createSlice, createAction } from '@reduxjs/toolkit';

import { requestGET } from '../utils';
import { AppDispatch } from '../index';
import { IFeedOrder, IFeedData } from './types';

export enum WebsocketStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}

export interface IFeedsState {
	status: WebsocketStatus;
	orders: IFeedData;
	error: string | null;
	extraOrder?: IFeedOrder;
}

export const initialState: IFeedsState = {
	status: WebsocketStatus.OFFLINE,
	orders: { success: false, orders: [], total: 0, totalToday: 0 },
	error: null,
	extraOrder: undefined,
};

export const connect = createAction<string, 'onConnect'>('onConnect');
export const disconnect = createAction('onDisconnect');

const slice = createSlice({
	name: 'feed',
	initialState,
	reducers: {
		onConnecting: (state) => {
			state.status = WebsocketStatus.CONNECTING;
		},

		onOpen: (state) => {
			state.status = WebsocketStatus.ONLINE;
		},

		onClose: (state) => {
			state.status = WebsocketStatus.OFFLINE;
		},

		onError: (state, action) => {
			state.error = action.payload;
		},

		onMessage: (state, action) => {
			state.orders = action.payload;
		},

		exOrderFetched: (state, action) => {
			state.extraOrder = action.payload;
		},
	},
});

export const fetchOrder = (ep: string) => (dispatch: AppDispatch) => {
	return requestGET(ep)
		.then((data) => dispatch(exOrderFetched(data.orders[0])))
		.catch((err) => {
			dispatch(onError('большая Ошибка при загрузке данных...'));
		});
};

export const feed = slice.reducer;

export const {
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
	exOrderFetched,
} = slice.actions;
