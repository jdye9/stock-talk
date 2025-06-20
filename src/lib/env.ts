export const getEnvVariables = () => {
	const baseUrl = import.meta.env.VITE_SERVICE_BASE_URL;
	if (!baseUrl) throw new Error("VITE_SERVICE_BASE_URL is not defined");
	return { baseUrl };
};
