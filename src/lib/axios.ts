import axios from "axios";
import { getEnvVariables } from "./env";

const { baseUrl } = getEnvVariables();

export const customAxios = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
});
