import {
	Button,
	Flex,
	Modal,
	MultiSelect,
	Text,
	TextInput,
} from "@mantine/core";
import { AddWatchlistModalProps } from "./types.ts";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useMemo, useState } from "react";
import { useGetTickers } from "../../../../hooks/useTickers.ts";

export const AddWatchlistModal = ({
	opened,
	addModalHandlers,
}: AddWatchlistModalProps) => {
	const { data } = useGetTickers();

	const [search, setSearch] = useState("");
	const form = useForm({
		mode: "controlled",
		initialValues: { watchlistName: "", initialEquities: [] as string[] },
		validate: {
			watchlistName: isNotEmpty("Watchlist Name is required"),
		},
	});

	const allOptions = useMemo(() => {
		if (!data) return [];

		const mapToOptions = (tickers: { symbol: string; name: string }[]) =>
			tickers.map((t) => ({
				label: `${t.symbol} - ${t.name}`,
				value: t.symbol,
			}));

		const combinedStocks = [
			...mapToOptions(data.nasdaq),
			...mapToOptions(data.other),
		];

		// Alphabetize by label
		combinedStocks.sort((a, b) => a.label.localeCompare(b.label));

		return combinedStocks;
	}, [data]);

	// Filter options by search and limit to 50
	const displayedOptions = useMemo(() => {
		if (!allOptions.length) return [];

		// Always include selected options
		const selected = allOptions.filter((opt) =>
			form.values.initialEquities.includes(opt.value)
		);

		if (!search) return selected;

		const lower = search.toLowerCase();

		// Match symbol label includes
		const matched = allOptions.filter((opt) =>
			opt.label.toLowerCase().includes(lower)
		);

		// Sort so that symbol startsWith appear first
		matched.sort((a, b) => {
			const aStarts = a.value.toLowerCase().startsWith(lower) ? 0 : 1;
			const bStarts = b.value.toLowerCase().startsWith(lower) ? 0 : 1;
			if (aStarts !== bStarts) return aStarts - bStarts;
			return a.label.localeCompare(b.label); // fallback alphabetical
		});

		// Limit to 50 results
		const limited = matched.slice(0, 100);

		// Merge selected + matched (avoid duplicates)
		const map = new Map<string, { label: string; value: string }>();
		[...selected, ...limited].forEach((opt) => {
			map.set(opt.value, opt);
		});

		return [{ group: "Stocks + ETFs", items: Array.from(map.values()) }];
	}, [search, allOptions, form.values.initialEquities]);

	const customOnClose = () => {
		form.reset();
		addModalHandlers.close();
		setSearch(""); // clear search on close
	};

	const [submittedValues, setSubmittedValues] = useState<
		typeof form.values | null
	>(null);

	useEffect(() => {
		console.log(form.values.initialEquities);
	}, [form.values.initialEquities]);

	return (
		<>
			<Modal
				opened={opened}
				onClose={customOnClose}
				title={<Text size="xl">Add Watchlist</Text>}
				centered
				size={"lg"}
			>
				<form onSubmit={form.onSubmit(setSubmittedValues)}>
					<Flex direction="column" gap="sm">
						<TextInput
							data-autofocus
							{...form.getInputProps("watchlistName")}
							label="New Watchlist Name"
							withAsterisk
						/>
						<MultiSelect
							label="Initial Equities"
							placeholder="Search Equities"
							data={displayedOptions}
							searchable
							searchValue={search}
							onSearchChange={setSearch}
							value={form.values.initialEquities}
							onChange={(val) => {
								form.setFieldValue("initialEquities", val);
							}}
							limit={50}
							hidePickedOptions
						/>
					</Flex>
					<Button type="submit" mt="md" size={"sm"}>
						Submit
					</Button>
				</form>
			</Modal>
		</>
	);
};
