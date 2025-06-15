import { useMemo, useState } from "react";
import { Spotlight } from "@mantine/spotlight";
import { Box, Flex, Group, Text } from "@mantine/core";
import { IconChevronRight, IconSearch } from "@tabler/icons-react";
import { useGetStocks } from "../../../../hooks/useStocks";
import classes from "./search-spotlight.module.css";

export const SearchSpotlight = () => {
	const [search, setSearch] = useState("");
	const { data } = useGetStocks();

	const allOptions = useMemo(() => {
		if (!data) return [];

		const mapToOptions = (stocks: { ticker: string; name: string }[]) =>
			stocks.map((t) => ({
				label: `${t.ticker} - ${t.name}`,
				value: t.ticker,
			}));

		const combinedStocks = [
			...mapToOptions(data.nasdaq),
			...mapToOptions(data.other),
		];

		combinedStocks.sort((a, b) => a.label.localeCompare(b.label));
		return combinedStocks;
	}, [data]);

	const displayedOptions = useMemo(() => {
		if (!allOptions.length) return [];

		const lower = search.toLowerCase();

		const matched = allOptions.filter((opt) =>
			opt.label.toLowerCase().includes(lower)
		);

		matched.sort((a, b) => {
			const aStarts = a.value.toLowerCase().startsWith(lower) ? 0 : 1;
			const bStarts = b.value.toLowerCase().startsWith(lower) ? 0 : 1;
			if (aStarts !== bStarts) return aStarts - bStarts;
			return a.label.localeCompare(b.label);
		});

		const limited = matched.slice(0, 100);

		return [{ group: "Stocks + ETFs", items: limited }];
	}, [search, allOptions]);

	const populateSearchResults = () => {
		const group = displayedOptions[0];

		if (!search) {
			return (
				<Spotlight.Empty>Please enter text to begin search...</Spotlight.Empty>
			);
		}

		if (!group || !group.items.length) {
			return <Spotlight.Empty>No results found...</Spotlight.Empty>;
		}

		return (
			<>
				<Flex
					align="center"
					w="100%"
					gap="sm"
					px="1rem"
					py="1rem"
					className={classes.groupTitleWrapper}
				>
					<Text
						size="sm"
						fw={500}
						c="dimmed"
						className={classes.groupTitle}
						title={group.group}
					>
						{group.group}
					</Text>
					<Box className={classes.groupDivider} />
				</Flex>
				{group.items.map((item) => (
					<Spotlight.Action key={item.value}>
						<Group wrap="nowrap" w="100%">
							<Flex align="center" justify="space-between" w="100%">
								<Box style={{ flex: 1 }}>
									<Text size="lg">{item.label.split(" - ")[1]}</Text>
									<Text size="sm" opacity={0.6}>
										{item.value}
									</Text>
								</Box>
								<IconChevronRight size={16} />
							</Flex>
						</Group>
					</Spotlight.Action>
				))}
			</>
		);
	};

	return (
		<Spotlight.Root query={search} onQueryChange={setSearch} size="70%">
			<Spotlight.Search
				placeholder="Search..."
				leftSection={<IconSearch stroke={1.5} />}
			/>
			<Spotlight.ActionsList
				style={{
					maxHeight: 400,
					overflowY: "auto",
					paddingRight: 4,
				}}
			>
				{populateSearchResults()}
			</Spotlight.ActionsList>
		</Spotlight.Root>
	);
};
