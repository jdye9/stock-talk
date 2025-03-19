import { SearchInput, SearchSpotlight } from "./components";
import { spotlight } from "@mantine/spotlight";

export const SearchEquities = () => {
	return (
		<>
			<SearchInput spotlight={spotlight} />
			<SearchSpotlight />
		</>
	);
};
