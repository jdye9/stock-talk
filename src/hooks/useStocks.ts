// src/queries/useStocks.ts
import { useQuery } from "@tanstack/react-query";
import { customAxios } from "../lib/axios";
import { StockResponse } from "./types";

export const useGetStocks = () =>
	useQuery<StockResponse>({
		queryKey: ["stocks"],
		queryFn: async () => {
			const { data } = await customAxios.get<StockResponse>("/stocks");
			return data;
		},
	});
