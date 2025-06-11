// src/queries/useTickers.ts
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../lib/axios";

type Ticker = {
	symbol: string;
	name: string;
};

type TickerResponse = {
	nasdaq: Ticker[];
	other: Ticker[];
};

export const useGetTickers = () =>
	useQuery<TickerResponse>({
		queryKey: ["tickers"],
		queryFn: async () => {
			const { data } = await customAxios.get<TickerResponse>("/tickers");
			return data;
		},
		staleTime: 1000 * 60 * 60 * 24, // 24 hours
	});
