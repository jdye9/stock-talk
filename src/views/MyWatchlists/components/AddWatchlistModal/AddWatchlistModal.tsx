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

		// Selected options should always display the ticker (value) as label
		const selectedSet = new Set(form.values.initialEquities);
		const selected = allOptions
			.filter((opt) => selectedSet.has(opt.value))
			.map((opt) => ({ ...opt, label: opt.value }));

		if (!search) {
			return [{ group: "Stocks + ETFs", items: selected }];
		}

		const lower = search.toLowerCase();

		const matched = allOptions.filter(
			(opt) =>
				opt.label.toLowerCase().includes(lower) ||
				opt.value.toLowerCase().includes(lower)
		);

		matched.sort((a, b) => {
			const aStarts = a.value.toLowerCase().startsWith(lower) ? 0 : 1;
			const bStarts = b.value.toLowerCase().startsWith(lower) ? 0 : 1;
			if (aStarts !== bStarts) return aStarts - bStarts;
			return a.label.localeCompare(b.label);
		});

		// Use Map to deduplicate, prioritizing matched
		const map = new Map<string, { label: string; value: string }>();
		matched.forEach((opt) => map.set(opt.value, opt));

		// Overwrite with selected so label = value for selected ones
		selected.forEach((opt) => map.set(opt.value, opt));

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

	const renderOption: Parameters<typeof MultiSelect>[0]["renderOption"] = ({
		option,
		...others
	}) => {
		const name = option.label.split(" - ")[1]?.trim();
		return (
			<div {...others}>
				<Flex direction="column" gap={0}>
					<Text size="md">{name}</Text>
					<Text size="sm" c="dimmed">
						{option.value}
					</Text>
				</Flex>
			</div>
		);
	};

	return (
		<>
			<Modal
				opened={opened}
				onClose={customOnClose}
				title={<Text size="xxl">Add Watchlist</Text>}
				centered
				size="xl"
			>
				<form onSubmit={form.onSubmit(setSubmittedValues)}>
					<Flex direction="column" gap="sm">
						<TextInput
							data-autofocus
							{...form.getInputProps("watchlistName")}
							label="New Watchlist Name"
							withAsterisk
							size="md"
						/>

						<MultiSelect
							label="Initial Equities"
							placeholder="Search Equities"
							data={displayedOptions}
							searchable
							searchValue={search}
							onSearchChange={setSearch}
							value={form.values.initialEquities}
							onChange={(val) => form.setFieldValue("initialEquities", val)}
							limit={100}
							nothingFoundMessage={search ? "No results found..." : ""}
							hidePickedOptions
							size="md"
							maxDropdownHeight={200}
							styles={{
								input: {
									maxHeight: 100, // Limit input area height
									overflowY: "auto",
								},
							}}
							renderOption={renderOption}
							clearable
							comboboxProps={{
								position: "bottom",
								middlewares: { flip: false, shift: false },
								withinPortal: false,
								styles: { dropdown: { position: "static" } },
							}}
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
