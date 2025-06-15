import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customAxios } from "../lib/axios";

// GET /watchlist
export function useGetWatchlists() {
	return useQuery({
		queryKey: ["watchlists"],
		queryFn: async () => {
			const res = await customAxios.get("/watchlists");
			return res.data;
		},
	});
}

export const useCreateWatchlist = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { name: string; stocks: string[]; crypto: string[] }) =>
			customAxios.post("/watchlist", data),
		onSuccess: () => {
			// Optionally refetch or update relevant queries
			queryClient.invalidateQueries({ queryKey: ["watchlists"] });
		},
	});
};
