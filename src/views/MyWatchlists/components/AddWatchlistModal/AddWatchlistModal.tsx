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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetStocks } from "../../../../hooks/useStocks.ts";
import { useGetCrypto } from "../../../../hooks/useCrypto.ts";
import { useCreateWatchlist } from "../../../../hooks/useWatchlist.ts";
import { Crypto, Stock } from "../../../../hooks/types.ts";
import { notifications } from "@mantine/notifications";

export const AddWatchlistModal = ({
	opened,
	addModalHandlers,
}: AddWatchlistModalProps) => {
	const { data: stocks } = useGetStocks();
	const { data: crypto } = useGetCrypto();
	const { mutate: createWatchlist, isSuccess: createWatchListSuccess } =
		useCreateWatchlist();

	const [searchEquity, setSearchEquity] = useState("");
	const [searchCrypto, setSearchCrypto] = useState("");
	const form = useForm({
		mode: "controlled",
		initialValues: {
			watchlistName: "",
			initialStocks: [] as string[],
			initialCrypto: [] as string[],
		},
		validate: {
			watchlistName: isNotEmpty("Watchlist Name is required"),
		},
	});

	const allStocks = useMemo(() => {
		if (!stocks) return [];

		const mapToOptions = (stocks: Stock[]) =>
			stocks.map((t) => ({
				label: `${t.ticker} - ${t.name}`,
				value: t.id,
				ticker: t.ticker,
				name: t.name,
			}));

		const combinedStocks = [...mapToOptions(stocks)];

		// Alphabetize by label
		combinedStocks.sort((a, b) => a.label.localeCompare(b.label));

		return combinedStocks;
	}, [stocks]);

	const allCrypto = useMemo(() => {
		if (!crypto) return [];

		const mapToOptions = (cryptoList: Crypto[]) =>
			cryptoList.map((c) => ({
				label: `${c.ticker} - ${c.name}`,
				value: c.id,
				ticker: c.ticker,
				name: c.name,
			}));

		const combinedCrypto = [...mapToOptions(crypto)];

		// Alphabetize by label
		combinedCrypto.sort((a, b) => a.label.localeCompare(b.label));

		return combinedCrypto;
	}, [crypto]);

	const filteredStocks = useMemo(() => {
		if (!allStocks.length) return [];

		const selectedStockSet = new Set(form.values.initialStocks);

		const selectedStocks = allStocks
			.filter((opt) => selectedStockSet.has(opt.value))
			.map((opt) => ({ ...opt, label: opt.ticker }));

		if (!searchEquity) return selectedStocks;

		const lower = searchEquity.toLowerCase();

		const matched = allStocks.filter(
			(opt) =>
				opt.label.toLowerCase().includes(lower) ||
				opt.value.toLowerCase().includes(lower) ||
				selectedStockSet.has(opt.value)
		);

		matched.sort((a, b) => {
			const aTicker = a.ticker?.toLowerCase() ?? a.value?.toLowerCase() ?? "";
			const bTicker = b.ticker?.toLowerCase() ?? b.value?.toLowerCase() ?? "";
			const aName =
				a.name?.toLowerCase() ?? a.label.split(" - ")[1]?.toLowerCase() ?? "";
			const bName =
				b.name?.toLowerCase() ?? b.label.split(" - ")[1]?.toLowerCase() ?? "";

			// 1. Exact name match
			if (aName === lower && bName !== lower) return -1;
			if (bName === lower && aName !== lower) return 1;

			// 2. Exact ticker match
			if (aTicker === lower && bTicker !== lower) return -1;
			if (bTicker === lower && aTicker !== lower) return 1;

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

			// 4. Prefix ticker match
			const aSymPrefix = aTicker.startsWith(lower);
			const bSymPrefix = bTicker.startsWith(lower);
			if (aSymPrefix && !bSymPrefix) return -1;
			if (bSymPrefix && !aSymPrefix) return 1;
			if (aSymPrefix && bSymPrefix) {
				// Shorter ticker comes first, then alphabetical
				if (aTicker.length !== bTicker.length)
					return aTicker.length - bTicker.length;
				return aTicker.localeCompare(bTicker);
			}

			// 5. Alphabetical by name, then ticker (shorter ticker first)
			const nameCompare = aName.localeCompare(bName);
			if (nameCompare !== 0) return nameCompare;
			if (aTicker.length !== bTicker.length)
				return aTicker.length - bTicker.length;
			return aTicker.localeCompare(bTicker);
		});

		// Overwrite label with just value if in selected
		const matchedWithSelectedLabel = matched.map((opt) =>
			selectedStockSet.has(opt.value) ? { ...opt, label: opt.ticker } : opt
		);

		return matchedWithSelectedLabel;
	}, [allStocks, form.values.initialStocks, searchEquity]);

	const filteredCrypto = useMemo(() => {
		console.log(allCrypto);
		if (!allCrypto.length) return [];

		const selectedCryptoSet = new Set(form.values.initialCrypto);
		console.log(selectedCryptoSet);

		const selectedCrypto = allCrypto
			.filter((opt) => selectedCryptoSet.has(opt.value))
			.map((opt) => ({ ...opt, label: opt.ticker }));
		console.log(selectedCrypto);

		if (!searchCrypto) return selectedCrypto;

		const lower = searchCrypto.toLowerCase();

		const matched = allCrypto.filter(
			(opt) =>
				opt.label.toLowerCase().includes(lower) ||
				opt.ticker.toLowerCase().includes(lower) ||
				selectedCryptoSet.has(opt.value)
		);

		matched.sort((a, b) => {
			const aTicker = a.ticker?.toLowerCase() ?? "";
			const bTicker = b.ticker?.toLowerCase() ?? "";
			const aName =
				a.name?.toLowerCase() ?? a.label.split(" - ")[1]?.toLowerCase() ?? "";
			const bName =
				b.name?.toLowerCase() ?? b.label.split(" - ")[1]?.toLowerCase() ?? "";

			// 1. Exact name match
			if (aName === lower && bName !== lower) return -1;
			if (bName === lower && aName !== lower) return 1;

			// 2. Exact ticker match
			if (aTicker === lower && bTicker !== lower) return -1;
			if (bTicker === lower && aTicker !== lower) return 1;

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

			// 4. Prefix ticker match
			const aSymPrefix = aTicker.startsWith(lower);
			const bSymPrefix = bTicker.startsWith(lower);
			if (aSymPrefix && !bSymPrefix) return -1;
			if (bSymPrefix && !aSymPrefix) return 1;
			if (aSymPrefix && bSymPrefix) {
				// Shorter ticker comes first, then alphabetical
				if (aTicker.length !== bTicker.length)
					return aTicker.length - bTicker.length;
				return aTicker.localeCompare(bTicker);
			}

			// 5. Alphabetical by name, then ticker (shorter ticker first)
			const nameCompare = aName.localeCompare(bName);
			if (nameCompare !== 0) return nameCompare;
			if (aTicker.length !== bTicker.length)
				return aTicker.length - bTicker.length;
			return aTicker.localeCompare(bTicker);
		});

		// Overwrite label with just value if in selected
		const matchedWithSelectedLabel = matched.map((opt) =>
			selectedCryptoSet.has(opt.value) ? { ...opt, label: opt.ticker } : opt
		);

		return matchedWithSelectedLabel;
	}, [allCrypto, form.values.initialCrypto, searchCrypto]);

	const customOnClose = useCallback(() => {
		form.reset();
		addModalHandlers.close();
		setSearchEquity("");
		setSearchCrypto("");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = () => {
		createWatchlist({
			name: form.values?.watchlistName ?? "",
			stocks: form.values?.initialStocks ?? [],
			crypto: form.values?.initialCrypto ?? [],
		});
	};

	useEffect(() => {
		if (createWatchListSuccess) {
			customOnClose();
			notifications.show({
				title: "Success",
				message: "Watchlist created successfully",
				color: "green",
				position: "top-right",
			});
		}
	}, [createWatchListSuccess, customOnClose]);

	const renderEquityOption: Parameters<
		typeof MultiSelect
	>[0]["renderOption"] = ({ option, ...others }) => {
		const [ticker, name] = option.label.split(" - ");
		return (
			<div {...others}>
				<Flex direction="column" gap={0}>
					<Text size="md">{name}</Text>
					<Text size="sm" c="dimmed">
						{ticker}
					</Text>
				</Flex>
			</div>
		);
	};

	const renderCryptoOption: Parameters<
		typeof MultiSelect
	>[0]["renderOption"] = ({ option, ...others }) => {
		const [ticker, name] = option.label.split(" - ");
		return (
			<div {...others}>
				<Flex direction="column" gap={0}>
					<Text size="md">{name}</Text>
					<Text size="sm" c="dimmed">
						{ticker}
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
				<form onSubmit={form.onSubmit(handleSubmit)}>
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
							data={filteredStocks}
							searchable
							searchValue={searchEquity}
							onSearchChange={setSearchEquity}
							value={form.values.initialStocks}
							onChange={(val) => form.setFieldValue("initialStocks", val)}
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
