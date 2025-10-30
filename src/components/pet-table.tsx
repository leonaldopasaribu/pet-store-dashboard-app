import { Box, Button, Stack, Table, Text } from '@chakra-ui/react';
import type { Pet } from '../api/pet-api';

interface PetTableProps {
  pets: Pet[];
  onUpdate: (petId: number | undefined) => void;
  onDelete: (petId: number | undefined) => void;
}

export const PetTable = ({ pets, onUpdate, onDelete }: PetTableProps) => {
  if (pets.length === 0) {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        shadow="sm"
        p={8}
        textAlign="center"
      >
        <Text color="gray.500" fontSize="lg">
          No pets found
        </Text>
      </Box>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" shadow="sm">
      <Table.Root size="lg" variant="outline">
        <Table.Header>
          <Table.Row bg="gray.50">
            <Table.ColumnHeader fontWeight="bold">No</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">ID</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Name</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Category</Table.ColumnHeader>
            <Table.ColumnHeader fontWeight="bold">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pets.map((pet, index) => (
            <Table.Row key={pet.id || index}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{pet.id || '-'}</Table.Cell>
              <Table.Cell fontWeight="medium">{pet.name}</Table.Cell>
              <Table.Cell fontWeight="medium">{pet.category?.name}</Table.Cell>
              <Table.Cell>
                <Stack direction="row" gap={2}>
                  <Button
                    size="sm"
                    colorPalette="blue"
                    variant="outline"
                    onClick={() => onUpdate(pet.id)}
                  >
                    Update
                  </Button>
                  <Button
                    size="sm"
                    colorPalette="red"
                    variant="outline"
                    onClick={() => onDelete(pet.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
