import { Flex } from "@mantine/core";
import { SettingsListProps } from "./types";

export const SettingsList = ({ children }: SettingsListProps) => {
	return (
		<Flex direction={"column"} gap={30} mx="auto" justify={"center"} h="100vh">
			{children}
		</Flex>
	);
};
