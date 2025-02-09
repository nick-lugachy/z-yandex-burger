import { BASE_URL } from './config';

export function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
}

export function requestGET(endpoint) {
	return fetch(BASE_URL + `/` + endpoint).then(checkResponse);
}

export function requestPOST(endpoint, parm) {
	return fetch(BASE_URL + `/` + endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(parm),
	}).then(checkResponse);
}
