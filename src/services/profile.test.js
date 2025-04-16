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
} from './profile.ts';

describe('profile reducer', () => {
	it('should return the initial state', () => {
		expect(profile(undefined, {})).toEqual({
			name: '',
			email: '',
			loading: false,
			hasError: false,
			errorTxt: '',
			authorized: false,
		});
	});

	it('should handle profileFetching', () => {
		expect(
			profile(undefined, {
				type: profileFetching,
			})
		).toEqual({
			name: '',
			email: '',
			loading: true,
			hasError: false,
			errorTxt: '',
			authorized: false,
		});
	});

	it('should handle userFetched', () => {
		expect(
			profile(undefined, {
				type: userFetched,
				payload: { user: { email: 'email', name: 'name' } },
			})
		).toEqual({
			name: 'name',
			email: 'email',
			loading: false,
			hasError: false,
			authorized: true,
			errorTxt: '',
		});
	});

	it('should handle forgotFetched', () => {
		expect(
			profile(undefined, {
				type: forgotFetched,
			})
		).toEqual({
			name: '',
			email: '',
			loading: false,
			hasError: false,
			authorized: false,
			errorTxt: '',
		});
	});

	it('should handle profFetcError', () => {
		expect(
			profile(undefined, {
				type: profFetcError,
				payload: { message: 'some error' },
			})
		).toEqual({
			name: '',
			email: '',
			loading: false,
			hasError: true,
			authorized: false,
			errorTxt: 'some error',
		});
	});
});
