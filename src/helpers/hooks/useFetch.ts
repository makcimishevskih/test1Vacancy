import { useState, useCallback } from 'react';

interface IRequest {
	method: string;
	body: any;
	headers: { [key: string]: string };
}

const useFetch = () => {
	const [error, setError] = useState<string>('');
	const [loader, setLoader] = useState<boolean>(false);
	let counter = 0;

	const request = useCallback(
		async (
			url: string,
			{
				method = 'GET',
				body = null,
				headers = {
					'Content-Type': 'application/json',
				},
			}: IRequest,
		) => {
			setLoader(true);

			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
				});
				if (!response.ok) {
					counter++;
					if (counter === 3) {
						counter = 0;
						throw new Error(
							`Could not fetch ${url} , status: ${response.status}`,
						);
					} else {
						setTimeout(() => {}, 5000);
						return;
					}
				}

				const data = await response.json();
				setLoader(false);

				return data;
			} catch (error) {
				if (typeof error === 'string') {
					setError(error);
				} else if (error instanceof Error) {
					setError(error.message);
				}
				setLoader(false);
			}
		},
		[],
	);

	const clearError = useCallback(() => {
		setError('');
	}, []);

	return {
		loader,
		error,
		request,
		clearError,
	};
};

export default useFetch;
