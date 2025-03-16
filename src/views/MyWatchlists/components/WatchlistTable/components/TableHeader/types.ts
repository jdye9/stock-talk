import { SortDirection } from "./../../types";
export type TableHeaderProps = {
	children: React.ReactNode;
	sortDirection: SortDirection;
	sorted: boolean;
	onSort: () => void;
};
