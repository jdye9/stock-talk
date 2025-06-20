import { Stock } from "../../../../hooks/types";

export type RowData = {
	id: string;
	ticker: string;
	name: string;
	price: number;
	priceChange: number;
	priceChangePercent: number;
};

export type SortDirection = "asc" | "desc" | "";

export type WatchlistTableProps = {
	stocks: Stock[];
};
