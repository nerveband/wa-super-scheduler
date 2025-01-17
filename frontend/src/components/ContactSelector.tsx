import { useEffect, useState } from 'react';
import {
  Box,
  Input,
  VStack,
  Text,
  Checkbox,
  CheckboxGroup,
  InputGroup,
  InputLeftElement,
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Contact, getContacts } from '../services/api';

interface Props {
  value: string[];
  onChange: (recipients: string[]) => void;
}

export default function ContactSelector({ value, onChange }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      if (response.status === 'success') {
        setContacts(response.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch contacts',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch contacts',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const searchLower = search.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.number.toLowerCase().includes(searchLower)
    );
  });

  const groups = filteredContacts.filter(c => c.type === 'group');
  const individuals = filteredContacts.filter(c => c.type === 'individual');

  return (
    <Box>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search contacts or groups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {loading ? (
        <Box textAlign="center" py={4}>
          <Spinner />
          <Text mt={2}>Loading contacts...</Text>
        </Box>
      ) : (
        <Tabs>
          <TabList>
            <Tab>Groups <Badge ml={2}>{groups.length}</Badge></Tab>
            <Tab>Contacts <Badge ml={2}>{individuals.length}</Badge></Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <CheckboxGroup value={value} onChange={onChange}>
                <VStack align="stretch" spacing={2}>
                  {groups.map(contact => (
                    <Checkbox key={contact.id} value={contact.id}>
                      <Text>
                        {contact.name}
                        <Text as="span" fontSize="sm" color="gray.500" ml={2}>
                          ({contact.number})
                        </Text>
                      </Text>
                    </Checkbox>
                  ))}
                  {groups.length === 0 && (
                    <Text color="gray.500">No groups found</Text>
                  )}
                </VStack>
              </CheckboxGroup>
            </TabPanel>

            <TabPanel>
              <CheckboxGroup value={value} onChange={onChange}>
                <VStack align="stretch" spacing={2}>
                  {individuals.map(contact => (
                    <Checkbox key={contact.id} value={contact.id}>
                      <Text>
                        {contact.name}
                        <Text as="span" fontSize="sm" color="gray.500" ml={2}>
                          ({contact.number})
                        </Text>
                      </Text>
                    </Checkbox>
                  ))}
                  {individuals.length === 0 && (
                    <Text color="gray.500">No contacts found</Text>
                  )}
                </VStack>
              </CheckboxGroup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
} 