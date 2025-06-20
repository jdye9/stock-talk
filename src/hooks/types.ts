import { Watchlist } from "../views/MyWatchlists/types";

export type Stock = {
	id: string;
	ticker: string;
	name: string;
};

export type StockResponse = Stock[];

export type Crypto = {
	id: string;
	ticker: string;
	name: string;
};

export type CryptoResponse = Crypto[];

export type GetWatchlistsResponse = Watchlist[];

export type CreateWatchlistRequest = {
	name: string;
	stocks: string[];
	crypto: string[];
};
