import {Button, Flex, Modal, MultiSelect, Text, TextInput, Title} from "@mantine/core";
import {AddWatchlistModalProps} from "./types.ts";
import {isNotEmpty, useForm} from "@mantine/form";
import {useState} from "react";


export const AddWatchlistModal = ({opened, addModalHandlers}: AddWatchlistModalProps) => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { watchlistName: '', initialEquities: [] },
        validate: {
            watchlistName: isNotEmpty('Watchlist Name is required'),
        },
    });

    const customOnClose = () => {
        form.reset()
        addModalHandlers.close()
    }

    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

    return (
        <>
            <Modal opened={opened} onClose={customOnClose} title={<Text size="xl">Add Watchlist</Text>} centered size={'lg'}>
                <form onSubmit={form.onSubmit(setSubmittedValues)}>
                    <Flex direction="column" gap="sm">
                        <TextInput
                            data-autofocus
                            {...form.getInputProps('watchlistName')}
                            key={form.key('watchlistName')}
                            label="New Watchlist Name"
                            withAsterisk
                        />
                        <MultiSelect
                            label="Initial Equities"
                            placeholder="Search Equities"
                            data={['PLTR', 'GOOG', 'AAPL', 'BB', 'BTC', 'ETH', 'SOL', 'VOO']}
                            searchable
                        />
                    </Flex>
                    <Button type="submit" mt="md" size={"sm"}>
                        Submit
                    </Button>
                </form>
            </Modal>
        </>
    );
}