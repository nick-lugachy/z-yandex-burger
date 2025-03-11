import { BASE_URL } from './config';

export function hasStoredToken() {
	const token = localStorage.getItem('accessToken');
	return token != null && token != 'null' && token != 'undefined';
}

export function checkResponse(res: Response) {
	if (res.ok) {
		return res.json();
	}
	return res.json().then((err: Error) => Promise.reject(err));
}

export async function requestGET(endpoint: string, token?: string) {
	return token === undefined
		? fetch(BASE_URL + `/` + endpoint).then(checkResponse)
		: fetch(BASE_URL + `/` + endpoint, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json', authorization: token },
		  }).then(checkResponse);
}

export async function requestPOST(endpoint: string, parm: object) {
	return fetch(BASE_URL + `/` + endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(parm),
	}).then(checkResponse);
}

export const refreshToken = async () => {
	return requestPOST('auth/token', {
		token: localStorage.getItem('refreshToken'),
	}).then((data) => {
		if (!data.success) return Promise.reject(data.message);

		localStorage.setItem('refreshToken', data.refreshToken ?? null);
		localStorage.setItem('accessToken', data.accessToken ?? null);
		return data;
	});
};

export async function FetchWithToken(
	endpoint: string,
	method = 'GET',
	parm?: object
) {
	const body = parm ? { body: JSON.stringify(parm) } : '';
	const url = BASE_URL + `/` + endpoint;
	const header = (token: string) => {
		return {
			method: method,
			headers: { 'Content-Type': 'application/json', authorization: token },
			...body,
		};
	};

	try {
		const res = await fetch(
			url,
			header(localStorage.getItem('accessToken') ?? '')
		);
		return await checkResponse(res);
	} catch (err: any) {
		//TODO: по какой то непонятной причине не дает тут написать тип Error
		if (err && err.message === 'jwt expired') {
			const data = await refreshToken();
			return await fetch(url, header(data.accessToken)).then(checkResponse);
		} else {
			return Promise.reject(err);
		}
	}
}
