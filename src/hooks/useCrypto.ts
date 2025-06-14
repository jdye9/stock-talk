// src/queries/useTickers.ts
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../lib/axios";

type Crypto = {
	symbol: string;
	id: string;
	name: string;
};

type CryptoResponse = Crypto[];

export const useGetCrypto = () =>
	useQuery<CryptoResponse>({
		queryKey: ["crypto"],
		queryFn: async () => {
			const { data } = await customAxios.get<CryptoResponse>("/crypto");
			return data;
		},
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	});
