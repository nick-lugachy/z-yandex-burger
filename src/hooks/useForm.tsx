import { useState, ChangeEvent } from 'react';

export const useForm = <T,>(
	inputValues: T
): {
	values: T;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	setValues: (name: T) => void;
} => {
	const [values, setValues] = useState<T>(inputValues);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setValues({ ...values, [name]: value });
	};
	return { values, handleChange, setValues };
};
