import {
	Card,
	Image,
	Text,
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
	const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });

	// -> computedColorScheme is 'light' | 'dark'
	const computedColorScheme = useComputedColorScheme();

	// Correct color scheme toggle implementation
	// computedColorScheme is always either 'light' or 'dark'
	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
	};

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder w={"325px"} mx="auto">
			<Card.Section>
				{
					<Image
						src={computedColorScheme === "dark" ? NightMountain : DayMountain}
						height={160}
						alt="NightMountain"
					/>
				}
			</Card.Section>

			<Flex direction="column" gap="4rem" align="flex-start">
				<Flex
					direction="column"
					justify="space-between"
					mt="md"
					align="flex-start"
				>
					<Text size="lg" fw={500}>
						Appearance
					</Text>
					<Text size="md" c="dimmed">
						Toggle between light and dark modes.
					</Text>
				</Flex>

				<Switch
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
					onChange={() => {
						toggleColorScheme();
					}}
					className={classes.switch}
					checked={computedColorScheme === "dark"}
				/>
			</Flex>
		</Card>
	);
};
