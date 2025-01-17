import { Box, Button, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure, VStack } from '@chakra-ui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMessages } from '../hooks/useMessages';
import { useState } from 'react';
import { ScheduleMessageModal } from '../components/ScheduleMessageModal';
import { MessageHistory } from '../components/MessageHistory';
import { Message } from '../types';

export const Home = () => {
    const { getMessages } = useMessages();
    const { data: messagesData } = getMessages();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateClick = (arg: { date: Date }) => {
        setSelectedDate(arg.date);
        onOpen();
    };

    const events = messagesData?.data.data.map((message: Message) => ({
        title: message.content,
        date: message.schedule_time,
        id: message.id.toString(),
    })) || [];

    return (
        <VStack spacing={6} align="stretch">
            <HStack justify="space-between">
                <Heading size="lg">Message Schedule</Heading>
                <Button onClick={onOpen}>Schedule Message</Button>
            </HStack>
            <Tabs>
                <TabList>
                    <Tab>Calendar</Tab>
                    <Tab>History</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box bg="white" p={4} borderRadius="md" shadow="sm">
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                events={events}
                                dateClick={handleDateClick}
                                height="auto"
                            />
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <MessageHistory />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <ScheduleMessageModal
                isOpen={isOpen}
                onClose={onClose}
                selectedDate={selectedDate}
            />
        </VStack>
    );
}; 