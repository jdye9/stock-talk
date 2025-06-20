import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
	fontFamily: "Montserrat Alternates",
	fontSizes: {
		xs: "0.75rem",
		sm: "1rem",
		md: "1.25rem",
		lg: "1.5rem",
		xl: "1.75rem",
		xxl: "2rem",
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<MantineProvider theme={theme} defaultColorScheme="auto">
					<Notifications />
					<App />
				</MantineProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);
