import { AppWrapper, Navbar, PageArea } from "./components";
import "./App.css";
import { MyWatchlists, Settings, SearchEquities } from "./views";
import { createTheme, MantineProvider} from "@mantine/core";
import {Routes, Route, Navigate} from "react-router-dom";
import "./index.css";

const theme = createTheme({
	fontFamily: "Comic Sans MS",
	fontSizes: {
		xs: "0.75rem",
		sm: "1rem",
		md: "1.25rem",
		lg: "1.5rem",
		xl: "1.75rem",
	},
});

function App() {
	return (
		<MantineProvider theme={theme} defaultColorScheme="auto">
			<AppWrapper>
				<Navbar />
				<PageArea>
					<Routes>
						<Route path="/" element={<Navigate to="/my-watchlists" replace />} />
						<Route path="/my-watchlists" element={<MyWatchlists />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/search-equities" element={<SearchEquities />} />
					</Routes>
				</PageArea>
			</AppWrapper>
		</MantineProvider>
	);
}

export default App;
