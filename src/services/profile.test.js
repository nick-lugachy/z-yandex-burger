import { refreshToken } from '../utils';
import {
	profile,
	profileFetching,
	forgotFetched,
	LoginFetched,
	profFetcError,
	setEmail,
	setName,
	userFetched,
	initialState,
} from './profile.ts';

describe('profile reducer', () => {
	it('should return the initial state', () => {
		expect(profile(undefined, {})).toEqual({
			...initialState,
		});
	});

	it('should handle profileFetching', () => {
		expect(
			profile(undefined, {
				type: profileFetching,
			})
		).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should handle userFetched', () => {
		expect(
			profile(undefined, {
				type: userFetched,
				payload: { user: { email: 'email', name: 'name' } },
			})
		).toEqual({
			...initialState,
			name: 'name',
			email: 'email',
			authorized: true,
		});
	});

	it('should handle forgotFetched', () => {
		expect(
			profile(undefined, {
				type: forgotFetched,
			})
		).toEqual({
			...initialState,
		});
	});

	it('should handle profFetcError', () => {
		expect(
			profile(undefined, {
				type: profFetcError,
				payload: { message: 'some error' },
			})
		).toEqual({
			...initialState,
			hasError: true,
			errorTxt: 'some error',
		});
	});

	it('should handle setEmail', () => {
		expect(
			profile(undefined, {
				type: setEmail,
				payload: 'email',
			})
		).toEqual({
			...initialState,
			email: 'email',
		});
	});

	it('should handle setName', () => {
		expect(
			profile(undefined, {
				type: setName,
				payload: 'name',
			})
		).toEqual({
			...initialState,
			name: 'name',
		});
	});
});
