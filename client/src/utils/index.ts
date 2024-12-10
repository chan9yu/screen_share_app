export const parseMessage = (data: string) => {
	try {
		return JSON.parse(data);
	} catch {
		return data;
	}
};
