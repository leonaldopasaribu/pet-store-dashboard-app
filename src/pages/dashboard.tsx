import { useEffect, useState } from 'react';
import { Box, Card, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { findPetsByStatus } from '../api/pet-api';

interface PetStats {
  available: number;
  sold: number;
  pending: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<PetStats>({
    available: 0,
    sold: 0,
    pending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [availablePets, soldPets, pendingPets] = await Promise.all([
          findPetsByStatus('available'),
          findPetsByStatus('sold'),
          findPetsByStatus('pending'),
        ]);

        setStats({
          available: availablePets.length,
          sold: soldPets.length,
          pending: pendingPets.length,
        });
      } catch (err) {
        console.error('Error fetching pet statistics:', err);
        setError('Failed to load pet statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetStats();
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Card.Root bg="red.50" borderColor="red.200" borderWidth="1px">
          <Card.Body>
            <Text color="red.600" fontWeight="medium">
              {error}
            </Text>
          </Card.Body>
        </Card.Root>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading size="2xl" mb={8}>
        Pet Store Dashboard
      </Heading>

      <Stack direction={{ base: 'column', md: 'row' }} gap={6}>
        <Card.Root
          flex="1"
          borderWidth="1px"
          borderColor="green.200"
          bg="green.50"
          _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
        >
          <Card.Body>
            <Stack gap={2}>
              <Text fontSize="sm" fontWeight="medium" color="green.700">
                Available Pets
              </Text>
              <Heading size="4xl" color="green.600">
                {stats.available}
              </Heading>
              <Text fontSize="sm" color="green.600">
                Ready for adoption
              </Text>
            </Stack>
          </Card.Body>
        </Card.Root>

        <Card.Root
          flex="1"
          borderWidth="1px"
          borderColor="orange.200"
          bg="orange.50"
          _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
        >
          <Card.Body>
            <Stack gap={2}>
              <Text fontSize="sm" fontWeight="medium" color="orange.700">
                Pending Pets
              </Text>
              <Heading size="4xl" color="orange.600">
                {stats.pending}
              </Heading>
              <Text fontSize="sm" color="orange.600">
                Awaiting confirmation
              </Text>
            </Stack>
          </Card.Body>
        </Card.Root>

        <Card.Root
          flex="1"
          borderWidth="1px"
          borderColor="blue.200"
          bg="blue.50"
          _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.2s"
        >
          <Card.Body>
            <Stack gap={2}>
              <Text fontSize="sm" fontWeight="medium" color="blue.700">
                Sold Pets
              </Text>
              <Heading size="4xl" color="blue.600">
                {stats.sold}
              </Heading>
              <Text fontSize="sm" color="blue.600">
                Successfully adopted
              </Text>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
};

export default Dashboard;
