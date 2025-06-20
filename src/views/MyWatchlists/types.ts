import { Stock } from "../../hooks/types";

export type AddModalHandlers = {
	readonly open: () => void;
	readonly close: () => void;
	readonly toggle: () => void;
};

export type Watchlist = {
	id: string;
	name: string;
	created_at: string;
	stocks: Stock[];
	cryptos: Crypto[];
};
