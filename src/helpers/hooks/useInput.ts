import { useCallback, useState, ChangeEvent } from 'react';

const useInput = (initialValue: string): any => {
	const [value, setValue] = useState<string>(initialValue);
	const [error, setError] = useState<string>('');

	const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setError('');
		if (typeof e.target.value === 'string') {
			setValue(() => e.target.value);
		}
	}, []);

	const resetInputValue = useCallback(() => {
		setValue(() => '');
	}, []);

	const handleErrorValue = useCallback((errorText: string) => {
		setError(() => errorText);
	}, []);

	return [value, resetInputValue, error, handleErrorValue, { handleInputChange }];
};

export default useInput;
