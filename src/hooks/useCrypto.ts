// src/queries/useStocks.ts
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../lib/axios";
import { CryptoResponse } from "./types";

export const useGetCrypto = () =>
	useQuery<CryptoResponse>({
		queryKey: ["crypto"],
		queryFn: async () => {
			const { data } = await customAxios.get<CryptoResponse>("/crypto");
			return data;
		},
	});
