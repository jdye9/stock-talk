import { useEffect, useState } from "react";
import { Spotlight } from "@mantine/spotlight";
import { Group, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const data = [
	{
		image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
		title: "Google",
		description: "GOOG",
		new: true,
	},

	{
		image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
		title: "Amazon",
		description: "AMZN",
		new: false,
	},
	{
		image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
		title: "Palantir",
		description: "PLTR",
		new: false,
	},
	{
		image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
		title: "MSFT",
		description: "Microsoft",
		new: false,
	},
];

export const SearchSpotlight = () => {
	const [query, setQuery] = useState("");

	useEffect(() => {
		console.log(query);
	}, [query]);

	const items = data
		.filter(
			(item) =>
				item.title.toLowerCase().includes(query?.toLowerCase().trim()) ||
				item.description.toLowerCase().includes(query?.toLowerCase().trim())
		)
		.map((item) => (
			<Spotlight.Action key={item.title} onClick={() => console.log(item)}>
				<Group wrap="nowrap" w="100%">
					<div style={{ flex: 1 }}>
						<Text size="lg">{item.title}</Text>

						{item.description && (
							<Text opacity={0.6} size="md">
								{item.description}
							</Text>
						)}
					</div>
				</Group>
			</Spotlight.Action>
		));

	return (
		<>
			<Spotlight.Root query={query} onQueryChange={setQuery} size={"70%"}>
				<Spotlight.Search
					placeholder="Search..."
					leftSection={<IconSearch stroke={1.5} />}
				/>
				<Spotlight.ActionsList>
					{items.length > 0 ? (
						items
					) : (
						<Spotlight.Empty>Nothing found...</Spotlight.Empty>
					)}
				</Spotlight.ActionsList>
			</Spotlight.Root>
		</>
	);
};
