export const setLocalStorage = (key: string, value: string) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
	return JSON.parse(localStorage.getItem(key) || "{}");
};

export const deleteLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};
