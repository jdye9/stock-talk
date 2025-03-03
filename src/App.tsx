import { AppWrapper, Navbar, PageArea } from "./components";
import "./App.css";
import { MyWatchlists } from "./views";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { Settings } from "./views/Settings";

function App() {
	return (
		<MantineProvider defaultColorScheme="light">
			<AppWrapper>
				<Navbar />
				<PageArea>
					<Routes>
						<Route path="my-watchlists" element={<MyWatchlists />} />
						<Route path="settings" element={<Settings />} />
					</Routes>
				</PageArea>
			</AppWrapper>
		</MantineProvider>
	);
}

export default App;
