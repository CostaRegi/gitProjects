import { useState, useEffect } from "react";

export const useFetch = <T>(url?: string): T | undefined => {
	const [data, setData] = useState<T>();
	useEffect(() => {
		if (url) {
			const fetchData = async () => {
				const response = await fetch(url);
				const responseJson = await response.json();
				setData(responseJson);
			};
			fetchData();
		}
	}, [url]);

	return data;
};
