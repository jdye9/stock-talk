import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customAxios } from "../lib/axios";
import { CreateWatchlistRequest, GetWatchlistsResponse } from "./types";

// GET /watchlist
export function useGetWatchlists() {
	return useQuery<GetWatchlistsResponse>({
		queryKey: ["watchlists"],
		queryFn: async () => {
			const res = await customAxios.get("/watchlists");
			return res.data;
		},
		select: (data) => data ?? [],
	});
}

export const useCreateWatchlist = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateWatchlistRequest) =>
			customAxios.post("/create-watchlist", data),
		onSuccess: () => {
			// Optionally refetch or update relevant queries
			queryClient.invalidateQueries({ queryKey: ["watchlists"] });
		},
	});
};
