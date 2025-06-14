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
				symbol: t.symbol,
				name: t.name,
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
				name: c.name,
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
				opt.value.toLowerCase().includes(lower) ||
				selectedTickerSet.has(opt.value)
		);

		matched.sort((a, b) => {
			const aSymbol = a.symbol?.toLowerCase() ?? a.value?.toLowerCase() ?? "";
			const bSymbol = b.symbol?.toLowerCase() ?? b.value?.toLowerCase() ?? "";
			const aName =
				a.name?.toLowerCase() ?? a.label.split(" - ")[1]?.toLowerCase() ?? "";
			const bName =
				b.name?.toLowerCase() ?? b.label.split(" - ")[1]?.toLowerCase() ?? "";

			// 1. Exact name match
			if (aName === lower && bName !== lower) return -1;
			if (bName === lower && aName !== lower) return 1;

			// 2. Exact symbol match
			if (aSymbol === lower && bSymbol !== lower) return -1;
			if (bSymbol === lower && aSymbol !== lower) return 1;

			// 3. Prefix name match
			const aPrefix = aName.startsWith(lower);
			const bPrefix = bName.startsWith(lower);
			if (aPrefix && !bPrefix) return -1;
			if (bPrefix && !aPrefix) return 1;
			if (aPrefix && bPrefix) {
				// Shorter name comes first, then alphabetical
				if (aName.length !== bName.length) return aName.length - bName.length;
				return aName.localeCompare(bName);
			}

			// 4. Prefix symbol match
			const aSymPrefix = aSymbol.startsWith(lower);
			const bSymPrefix = bSymbol.startsWith(lower);
			if (aSymPrefix && !bSymPrefix) return -1;
			if (bSymPrefix && !aSymPrefix) return 1;
			if (aSymPrefix && bSymPrefix) {
				// Shorter symbol comes first, then alphabetical
				if (aSymbol.length !== bSymbol.length)
					return aSymbol.length - bSymbol.length;
				return aSymbol.localeCompare(bSymbol);
			}

			// 5. Alphabetical by name, then symbol (shorter symbol first)
			const nameCompare = aName.localeCompare(bName);
			if (nameCompare !== 0) return nameCompare;
			if (aSymbol.length !== bSymbol.length)
				return aSymbol.length - bSymbol.length;
			return aSymbol.localeCompare(bSymbol);
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
		console.log(selectedCryptoSet);

		const selectedCrypto = allCrypto
			.filter((opt) => selectedCryptoSet.has(opt.value))
			.map((opt) => ({ ...opt, label: opt.symbol }));
		console.log(selectedCrypto);

		if (!searchCrypto) return selectedCrypto;

		const lower = searchCrypto.toLowerCase();

		const matched = allCrypto.filter(
			(opt) =>
				opt.label.toLowerCase().includes(lower) ||
				opt.symbol.toLowerCase().includes(lower) ||
				selectedCryptoSet.has(opt.value)
		);

		matched.sort((a, b) => {
			const aSymbol = a.symbol?.toLowerCase() ?? "";
			const bSymbol = b.symbol?.toLowerCase() ?? "";
			const aName =
				a.name?.toLowerCase() ?? a.label.split(" - ")[1]?.toLowerCase() ?? "";
			const bName =
				b.name?.toLowerCase() ?? b.label.split(" - ")[1]?.toLowerCase() ?? "";

			// 1. Exact name match
			if (aName === lower && bName !== lower) return -1;
			if (bName === lower && aName !== lower) return 1;

			// 2. Exact symbol match
			if (aSymbol === lower && bSymbol !== lower) return -1;
			if (bSymbol === lower && aSymbol !== lower) return 1;

			// 2. Prefix name match
			const aPrefix = aName.startsWith(lower);
			const bPrefix = bName.startsWith(lower);
			if (aPrefix && !bPrefix) return -1;
			if (bPrefix && !aPrefix) return 1;
			if (aPrefix && bPrefix) {
				// Shorter name comes first, then alphabetical
				if (aName.length !== bName.length) return aName.length - bName.length;
				return aName.localeCompare(bName);
			}

			// 4. Prefix symbol match
			const aSymPrefix = aSymbol.startsWith(lower);
			const bSymPrefix = bSymbol.startsWith(lower);
			if (aSymPrefix && !bSymPrefix) return -1;
			if (bSymPrefix && !aSymPrefix) return 1;
			if (aSymPrefix && bSymPrefix) {
				// Shorter symbol comes first, then alphabetical
				if (aSymbol.length !== bSymbol.length)
					return aSymbol.length - bSymbol.length;
				return aSymbol.localeCompare(bSymbol);
			}

			// 5. Alphabetical by name, then symbol (shorter symbol first)
			const nameCompare = aName.localeCompare(bName);
			if (nameCompare !== 0) return nameCompare;
			if (aSymbol.length !== bSymbol.length)
				return aSymbol.length - bSymbol.length;
			return aSymbol.localeCompare(bSymbol);
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
		const [symbol, name] = option.label.split(" - ");
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
								withinPortal: true,
								// styles: { dropdown: { position: "static" } },
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
								withinPortal: true,
								// styles: { dropdown: { position: "static" } },
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
