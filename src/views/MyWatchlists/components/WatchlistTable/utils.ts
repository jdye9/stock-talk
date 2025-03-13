import { RowData } from "./types";
import { keys } from "@mantine/core";

export const filterData = (data: RowData[], search: string) => {
	const query = search.toLowerCase().trim();
	return data.filter((item) =>
		keys(data[0]).some((key) => {
			const stringVal = item[key].toString();
			return stringVal.toLowerCase().includes(query);
		})
	);
};

export const sortData = (
	data: RowData[],
	payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) => {
	const { sortBy } = payload;

	if (!sortBy) {
		return filterData(data, payload.search);
	}

	return filterData(
		[...data].sort((a, b) => {
			if (typeof a[sortBy] === "string" && typeof b[sortBy] === "string") {
				if (payload.reversed) {
					return b[sortBy].localeCompare(a[sortBy]);
				}
				return a[sortBy].localeCompare(b[sortBy]);
			} else if (
				typeof a[sortBy] === "number" &&
				typeof b[sortBy] === "number"
			) {
				if (payload.reversed) {
					return b[sortBy] - a[sortBy];
				}
				return a[sortBy] - b[sortBy];
			}
			return 0;
		}),
		payload.search
	);
};
