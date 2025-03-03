import {
	Card,
	Image,
	Text,
	Group,
	Switch,
	Flex,
	useMantineColorScheme,
	useComputedColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import classes from "./dark-mode-card.module.css";
import NightMountain from "@/assets/night-mountain.png";
import DayMountain from "@/assets/day-mountain.png";

export const DarkModeCard = () => {
	// -> colorScheme is 'auto' | 'light' | 'dark'
	const { setColorScheme } = useMantineColorScheme();

	// -> computedColorScheme is 'light' | 'dark', argument is the default value
	const computedColorScheme = useComputedColorScheme(
		window.localStorage["mantine-color-scheme-value"] || "light"
	);

	// Correct color scheme toggle implementation
	// computedColorScheme is always either 'light' or 'dark'
	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
	};

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Card.Section>
				{
					<Image
						src={computedColorScheme === "dark" ? NightMountain : DayMountain}
						height={160}
						alt="NightMountain"
					/>
				}
			</Card.Section>

			<Flex gap={"1rem"} direction={"column"}>
				<Group justify="space-between" mt="md">
					<Text fw={500}>Appearance</Text>
				</Group>

				<Text size="sm" c="dimmed">
					Toggle between light and dark modes.
				</Text>

				<Switch
					checked={computedColorScheme !== "dark"}
					size="xl"
					color="dark.4"
					onLabel={
						<IconSun
							size={24}
							stroke={2.5}
							color="var(--mantine-color-yellow-4)"
						/>
					}
					offLabel={
						<IconMoonStars
							size={24}
							stroke={2.5}
							color="var(--mantine-color-blue-6)"
						/>
					}
					onChange={() => toggleColorScheme()}
					className={classes.switch}
				/>
			</Flex>
		</Card>
	);
};
