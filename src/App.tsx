import { AppWrapper, Navbar, PageArea } from "./components";
import "./App.css";
import { MyWatchlists, Settings, SearchEquities } from "./views";
import { createTheme, MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import "./index.css";

const theme = createTheme({
	fontFamily: "JetBrains Mono",
	fontSizes: {
		xs: "0.5rem",
		sm: "0.75rem",
		md: "1rem",
		lg: "1.25rem",
		xl: "2rem",
	},
});

function App() {
	return (
		<MantineProvider theme={theme} defaultColorScheme="auto">
			<AppWrapper>
				<Navbar />
				<PageArea>
					<Routes>
						<Route path="my-watchlists" element={<MyWatchlists />} />
						<Route path="settings" element={<Settings />} />
						<Route path="search-equities" element={<SearchEquities />} />
					</Routes>
				</PageArea>
			</AppWrapper>
		</MantineProvider>
	);
}

export default App;
