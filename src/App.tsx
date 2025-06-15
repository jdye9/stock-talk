import { AppWrapper, Navbar, PageArea } from "./components";
import "./App.css";
import { MyWatchlists, Settings, SearchEquities } from "./views";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

function App() {
	return (
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
	);
}

export default App;
