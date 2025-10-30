import { Link, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { Home, List } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/pets', label: 'Pet List', icon: List },
  ];

  return (
    <Box
      w="250px"
      minH="100vh"
      bg="white"
      borderRightWidth="1px"
      borderRightColor="gray.200"
      position="fixed"
      left={0}
      top={0}
    >
      <Box p={6}>
        <Heading size="xl" color="blue.600" mb={8}>
          Pet Store
        </Heading>

        <Stack gap={2}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Flex
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="lg"
                  bg={isActive(item.path) ? 'blue.50' : 'transparent'}
                  color={isActive(item.path) ? 'blue.600' : 'gray.700'}
                  fontWeight={isActive(item.path) ? 'semibold' : 'medium'}
                  _hover={{ bg: 'blue.50', color: 'blue.600' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <Icon size={20} />
                  <Text>{item.label}</Text>
                </Flex>
              </Link>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};
