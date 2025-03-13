import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { ScrollArea, Table, Text, TextInput } from "@mantine/core";
import { TableHeader } from "./components";
import { RowData } from "./types";
import { sortData } from "./utils";
import { mockTableRows } from "./constants";

export const WatchlistTable = () => {
	const [search, setSearch] = useState("");
	const [sortedData, setSortedData] = useState(mockTableRows);
	const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		setSortedData(sortData(mockTableRows, { sortBy: field, reversed, search }));
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		setSortedData(
			sortData(mockTableRows, {
				sortBy,
				reversed: reverseSortDirection,
				search: value,
			})
		);
	};

	const rows = sortedData.map((row) => (
		<Table.Tr key={row.ticker} fz={14}>
			<Table.Td>{row.ticker}</Table.Td>
			<Table.Td>$ {row.price}</Table.Td>
			<Table.Td>$ {row.priceChange}</Table.Td>
			<Table.Td>{row.priceChangePercent} %</Table.Td>
		</Table.Tr>
	));

	return (
		<>
			<TextInput
				placeholder="Search by any field"
				mb="md"
				leftSection={<IconSearch size={16} stroke={1.5} />}
				value={search}
				onChange={handleSearchChange}
			/>
			<ScrollArea h={250} pr={10}>
				<Table
					horizontalSpacing="md"
					verticalSpacing="xs"
					miw={700}
					layout="fixed"
					stickyHeader
					top={0}
				>
					<Table.Thead>
						<TableHeader
							sorted={sortBy === "ticker"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("ticker")}
						>
							Ticker
						</TableHeader>
						<TableHeader
							sorted={sortBy === "price"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("price")}
						>
							Price
						</TableHeader>
						<TableHeader
							sorted={sortBy === "priceChange"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("priceChange")}
						>
							Price Change $
						</TableHeader>
						<TableHeader
							sorted={sortBy === "priceChangePercent"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("priceChangePercent")}
						>
							Price Change %
						</TableHeader>
					</Table.Thead>
					<Table.Tbody>
						{rows.length > 0 ? (
							rows
						) : (
							<Table.Tr>
								<Table.Td colSpan={Object.keys(mockTableRows[0]).length}>
									<Text fw={500} ta="center">
										Nothing found
									</Text>
								</Table.Td>
							</Table.Tr>
						)}
					</Table.Tbody>
				</Table>
			</ScrollArea>
		</>
	);
};
