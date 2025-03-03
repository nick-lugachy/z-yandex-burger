import { createSlice } from '@reduxjs/toolkit';

import { requestGET, requestPOST, FetchWithToken } from '../utils';

const ep = 'profile';
const epForgot = 'password-reset';
const epRegister = 'auth/register';
const epLogin = 'auth/login';
const epLogout = 'auth/logout';
const epUser = 'auth/user';
const epReset = `password-reset/reset`;

const initialState = {
	email: '',
	name: '',
	//	token: null,
	//	refreshToken: null,
	loading: false,
	hasError: false,
	errorTxt: '',
	authorized: false,
};

const slice = createSlice({
	name: { ep },
	initialState,
	reducers: {
		profileFetching: (state) => {
			state.loading = true;
			state.hasError = false;
			state.errorTxt = '';
		},

		setEmail: (state, action) => {
			if (!state.loading) {
				state.email = action.payload;
				state.hasError = false;
				state.errorTxt = '';
			}
		},

		setName: (state, action) => {
			if (!state.loading) {
				state.name = action.payload;
				state.hasError = false;
				state.errorTxt = '';
			}
		},

		LoginFetched: (state, action) => {
			//			state.token = action.payload.accessToken;
			//			state.refreshToken = action.payload.refreshToken;

			localStorage.setItem('refreshToken', action.payload.refreshToken ?? null);
			localStorage.setItem('accessToken', action.payload.accessToken ?? null);

			state.loading = false;
			state.hasError = false;
			state.errorTxt = '';

			state.authorized = action.payload.refreshToken ? true : false;
		},

		userFetched: (state, action) => {
			state.email = action.payload.user.email;
			state.name = action.payload.user.name;
			state.loading = false;
			state.authorized = true;
		},

		forgotFetched: (state, action) => {
			state.loading = false;
			state.hasError = false;
			state.errorTxt = '';
		},

		// profileFetched: (state, action) => {
		// 	state.data = action.payload;
		// 	state.loading = false;
		// 	state.hasError = false;
		// },

		profFetcError: (state, action) => {
			state.loading = false;
			state.hasError = true;
			state.errorTxt = action.payload.message;
			state.authorized = false;

			console.log(state.errorTxt);
		},
	},
});

export const profileRegUser = (password) => async (dispatch, getState) => {
	const profile = getState().profile;

	dispatch(profileFetching());
	return requestPOST(epRegister, {
		email: profile.email,
		password: password,
		name: profile.name,
	})
		.then((data) => {
			dispatch(LoginFetched(data));
		})
		.catch((err) => {
			dispatch(profFetcError(err));
		});
};

export const profileLogin = (password) => async (dispatch, getState) => {
	const profile = getState().profile;

	dispatch(profileFetching());
	return requestPOST(epLogin, {
		email: profile.email,
		password: password,
	})
		.then((data) => {
			dispatch(LoginFetched(data));
		})
		.catch((err) => {
			dispatch(profFetcError(err));
		});
};

export const resetPassword = (password, token) => async (dispatch) => {
	dispatch(profileFetching());
	requestPOST(epReset, {
		password: password,
		token: token,
	})
		.then((data) => {
			dispatch(forgotFetched(data));
		})
		.catch((err) => {
			dispatch(profFetcError(err));
		});
};

export const profileLogout = (password) => async (dispatch, getState) => {
	dispatch(profileFetching());
	return requestPOST(epLogout, {
		token: localStorage.getItem('refreshToken'),
	})
		.then((data) => {
			dispatch(LoginFetched(data));
		})
		.catch((err) => {
			dispatch(profFetcError(err));
		});
};

export const patchUserInfo = (password) => async (dispatch, getState) => {
	const profile = getState().profile;
	dispatch(profileFetching());

	return FetchWithToken(epUser, 'PATCH', {
		email: profile.email,
		name: profile.name,
		password: password,
	})
		.then((data) => {
			dispatch(userFetched(data));
		})
		.catch((err) => {
			dispatch(profFetcError(err));
		});
};

export const getUserInfo = () => async (dispatch) => {
	dispatch(profileFetching());

	return FetchWithToken(epUser)
		.then((data) => {
			dispatch(userFetched(data));
		})
		.catch((err) => {
			dispatch(profFetcError(err));
		});
};

export const profileSendEmail = (callback) => async (dispatch, getState) => {
	const state = getState();

	dispatch(profileFetching());
	return requestPOST(epForgot, { email: state.email })
		.then((data) => {
			dispatch(forgotFetched(data));
			console.log(data);
			callback();
		})
		.catch((err) => {
			dispatch(profFetcError(err));
		});
};

export const profile = slice.reducer;

export const {
	profileFetching,
	forgotFetched,
	LoginFetched,
	profFetcError,
	setEmail,
	setName,
	userFetched,
} = slice.actions;

export default profile;
