import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { useMessages } from '../hooks/useMessages';

interface ScheduleMessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate?: Date | null;
}

export const ScheduleMessageModal = ({ isOpen, onClose, selectedDate }: ScheduleMessageModalProps) => {
    const [content, setContent] = useState('');
    const [recipients, setRecipients] = useState('');
    const { scheduleMessage } = useMessages();
    const scheduleMutation = scheduleMessage();

    const handleSubmit = async () => {
        try {
            await scheduleMutation.mutateAsync({
                content,
                scheduleTime: selectedDate?.toISOString() || new Date().toISOString(),
                recipients: recipients.split(',').map((r: string) => r.trim()),
            });
            onClose();
            setContent('');
            setRecipients('');
        } catch (error) {
            console.error('Failed to schedule message:', error);
        }
    };

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleRecipientsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipients(e.target.value);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Schedule Message</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                value={content}
                                onChange={handleContentChange}
                                placeholder="Enter your message"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Recipients</FormLabel>
                            <Input
                                value={recipients}
                                onChange={handleRecipientsChange}
                                placeholder="Enter phone numbers (comma-separated)"
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={scheduleMutation.isPending}
                    >
                        Schedule
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}; 