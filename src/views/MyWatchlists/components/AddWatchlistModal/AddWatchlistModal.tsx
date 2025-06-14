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
import { useMemo, useState } from "react";
import { useGetTickers } from "../../../../hooks/useTickers.ts";
import { useGetCrypto } from "../../../../hooks/useCrypto.ts";

export const AddWatchlistModal = ({
	opened,
	addModalHandlers,
}: AddWatchlistModalProps) => {
	const { data: tickers } = useGetTickers();
	const { data: crypto } = useGetCrypto();

	const [searchEquity, setSearchEquity] = useState("");
	const [searchCrypto, setSearchCrypto] = useState("");
	const form = useForm({
		mode: "controlled",
		initialValues: {
			watchlistName: "",
			initialTickers: [] as string[],
			initialCrypto: [] as string[],
		},
		validate: {
			watchlistName: isNotEmpty("Watchlist Name is required"),
		},
	});

	const allTickers = useMemo(() => {
		if (!tickers) return [];

		const mapToOptions = (tickers: { symbol: string; name: string }[]) =>
			tickers.map((t) => ({
				label: `${t.symbol} - ${t.name}`,
				value: t.symbol,
			}));

		const combinedStocks = [
			...mapToOptions(tickers.nasdaq),
			...mapToOptions(tickers.other),
		];

		// Alphabetize by label
		combinedStocks.sort((a, b) => a.label.localeCompare(b.label));

		return combinedStocks;
	}, [tickers]);

	const allCrypto = useMemo(() => {
		if (!crypto) return [];

		const mapToOptions = (
			cryptoList: { id: string; symbol: string; name: string }[]
		) =>
			cryptoList.map((c) => ({
				label: `${c.symbol} - ${c.name}`,
				value: c.id,
				symbol: c.symbol,
			}));

		const combinedCrypto = [...mapToOptions(crypto)];

		// Alphabetize by label
		combinedCrypto.sort((a, b) => a.label.localeCompare(b.label));

		return combinedCrypto;
	}, [crypto]);

	const filteredTickers = useMemo(() => {
		if (!allTickers.length) return [];

		const selectedTickerSet = new Set(form.values.initialTickers);

		const selectedTickers = allTickers
			.filter((opt) => selectedTickerSet.has(opt.value))
			.map((opt) => ({ ...opt, label: opt.value }));

		if (!searchEquity) return selectedTickers;

		const lower = searchEquity.toLowerCase();

		const matched = allTickers.filter(
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

		// Overwrite label with just value if in selected
		const matchedWithSelectedLabel = matched.map((opt) =>
			selectedTickerSet.has(opt.value) ? { ...opt, label: opt.value } : opt
		);

		return matchedWithSelectedLabel;
	}, [allTickers, form.values.initialTickers, searchEquity]);

	const filteredCrypto = useMemo(() => {
		console.log(allCrypto);
		if (!allCrypto.length) return [];

		const selectedCryptoSet = new Set(form.values.initialCrypto);

		const selectedCrypto = allCrypto
			.filter((opt) => selectedCryptoSet.has(opt.value))
			.map((opt) => ({ ...opt, label: opt.symbol }));

		if (!searchCrypto) return selectedCrypto;

		const lower = searchCrypto.toLowerCase();

		const matched = allCrypto.filter(
			(opt) =>
				opt.label.toLowerCase().includes(lower) ||
				opt.symbol.toLowerCase().includes(lower)
		);

		console.log(matched);

		matched.sort((a, b) => {
			const aStarts = a.symbol.toLowerCase().startsWith(lower) ? 0 : 1;
			const bStarts = b.symbol.toLowerCase().startsWith(lower) ? 0 : 1;
			if (aStarts !== bStarts) return aStarts - bStarts;
			return a.label.localeCompare(b.label);
		});

		// Overwrite label with just value if in selected
		const matchedWithSelectedLabel = matched.map((opt) =>
			selectedCryptoSet.has(opt.value) ? { ...opt, label: opt.symbol } : opt
		);

		return matchedWithSelectedLabel;
	}, [allCrypto, form.values.initialCrypto, searchCrypto]);
	const customOnClose = () => {
		form.reset();
		addModalHandlers.close();
		setSearchEquity("");
		setSearchCrypto("");
	};

	const [submittedValues, setSubmittedValues] = useState<
		typeof form.values | null
	>(null);

	const renderEquityOption: Parameters<
		typeof MultiSelect
	>[0]["renderOption"] = ({ option, ...others }) => {
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

	const renderCryptoOption: Parameters<
		typeof MultiSelect
	>[0]["renderOption"] = ({ option, ...others }) => {
		const [symbol, name, id] = option.label.split(" - ");
		return (
			<div {...others}>
				<Flex direction="column" gap={0}>
					<Text size="md">{name}</Text>
					<Text size="sm" c="dimmed">
						{symbol}
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
							data={filteredTickers}
							searchable
							searchValue={searchEquity}
							onSearchChange={setSearchEquity}
							value={form.values.initialTickers}
							onChange={(val) => form.setFieldValue("initialTickers", val)}
							limit={100}
							nothingFoundMessage={searchEquity ? "No results found..." : ""}
							hidePickedOptions
							size="md"
							maxDropdownHeight={200}
							styles={{
								input: {
									maxHeight: 100,
									overflowY: "auto",
								},
							}}
							renderOption={renderEquityOption}
							clearable
							comboboxProps={{
								position: "bottom",
								middlewares: { flip: false, shift: false },
								withinPortal: false,
								styles: { dropdown: { position: "static" } },
							}}
						/>

						<MultiSelect
							label="Initial Cryptocurrencies"
							placeholder="Search Cryptocurrencies"
							data={filteredCrypto}
							searchable
							searchValue={searchCrypto}
							onSearchChange={setSearchCrypto}
							value={form.values.initialCrypto}
							onChange={(val) => form.setFieldValue("initialCrypto", val)}
							limit={100}
							nothingFoundMessage={searchCrypto ? "No results found..." : ""}
							hidePickedOptions
							size="md"
							maxDropdownHeight={200}
							styles={{
								input: {
									maxHeight: 100,
									overflowY: "auto",
								},
							}}
							renderOption={renderCryptoOption}
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
