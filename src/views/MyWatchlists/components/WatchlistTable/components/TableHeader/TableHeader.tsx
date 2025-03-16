import {
	IconChevronDown,
	IconChevronUp,
	IconSelector,
} from "@tabler/icons-react";
import { TableHeaderProps } from "./types";
import classes from "./table-header.module.css";
import { Center, Group, Table, UnstyledButton, Text } from "@mantine/core";

export const TableHeader = ({
	children,
	sortDirection,
	sorted,
	onSort,
}: TableHeaderProps) => {
	const Icon = sorted
		? sortDirection == "desc"
			? IconChevronDown
			: IconChevronUp
		: IconSelector;

	return (
		<Table.Th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group justify="space-between">
					<Text fw={500} fz={14}>
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon size={24} stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</Table.Th>
	);
};
