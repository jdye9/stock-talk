import { useState } from "react";
import { Spotlight } from "@mantine/spotlight";
import { Group, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const data = [
	{
		image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
		title: "Google",
		description: "GOOG",
	},

	{
		image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
		title: "Amazon",
		description: "AMZN",
	},
	{
		image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
		title: "Palantir",
		description: "PLTR",
	},
	{
		image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
		title: "Microsoft",
		description: "MSFT",
	},
];

export const SearchSpotlight = () => {
	const [query, setQuery] = useState("");

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

	const populateSearchResults = () => {
		if (query.length) {
			return items.length ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>
		}
		return <Spotlight.Empty>Please enter text to begin search...</Spotlight.Empty>
	}

	return (
		<>
			<Spotlight.Root query={query} onQueryChange={setQuery} size={"70%"}>
				<Spotlight.Search
					placeholder="Search..."
					leftSection={<IconSearch stroke={1.5} />}
				/>
				<Spotlight.ActionsList>
					{populateSearchResults()}
				</Spotlight.ActionsList>
			</Spotlight.Root>
		</>
	);
};
