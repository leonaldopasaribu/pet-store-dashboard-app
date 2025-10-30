import { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { CreatePetModal } from '../components/create-pet-modal';
import { UpdatePetModal } from '../components/update-pet-modal';
import { DeleteConfirmDialog } from '../components/delete-confirm-dialog';
import { PetTable } from '../components/pet-table';
import { findPetsByStatus, deletePet, type Pet } from '../api/pet-api';
import { toaster } from '../components/ui/toaster';

type PetStatus = 'available' | 'pending' | 'sold';

const PetList = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<PetStatus>('available');
  const [error, setError] = useState<string | null>(null);

  const fetchPets = async (status: PetStatus) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await findPetsByStatus(status);
      setPets(data);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets');
      toaster.create({
        title: 'Error',
        description: 'Failed to load pets',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPets(selectedStatus);
  }, [selectedStatus]);

  const handleStatusFilter = (status: PetStatus) => {
    setSelectedStatus(status);
  };

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<number | undefined>(undefined);
  const [selectedPetName, setSelectedPetName] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = (petId: number | undefined) => {
    if (!petId) {
      toaster.create({
        title: 'Error',
        description: 'Invalid pet ID',
        type: 'error',
      });
      return;
    }
    setSelectedPetId(petId);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (petId: number | undefined) => {
    if (!petId) {
      toaster.create({
        title: 'Error',
        description: 'Invalid pet ID',
        type: 'error',
      });
      return;
    }

    const pet = pets.find(p => p.id === petId);

    setSelectedPetId(petId);
    setSelectedPetName(pet?.name || '');
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPetId) return;

    setIsDeleting(true);
    try {
      await deletePet(selectedPetId);
      toaster.create({
        title: 'Success',
        description: 'Pet deleted successfully',
        type: 'success',
      });
      setIsDeleteDialogOpen(false);
      fetchPets(selectedStatus);
    } catch (err) {
      console.error('Error deleting pet:', err);
      toaster.create({
        title: 'Error',
        description: 'Failed to delete pet',
        type: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreatePet = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPetId(undefined);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedPetId(undefined);
    setSelectedPetName('');
  };

  const handleModalSuccess = () => {
    fetchPets(selectedStatus);
  };

  return (
    <Box p={8}>
      <Heading size="2xl" mb={6}>
        Pet List
      </Heading>

      <Stack direction="row" gap={4} mb={6}>
        <Button
          colorPalette={selectedStatus === 'available' ? 'green' : 'gray'}
          variant={selectedStatus === 'available' ? 'solid' : 'outline'}
          onClick={() => handleStatusFilter('available')}
        >
          Available
        </Button>
        <Button
          colorPalette={selectedStatus === 'pending' ? 'orange' : 'gray'}
          variant={selectedStatus === 'pending' ? 'solid' : 'outline'}
          onClick={() => handleStatusFilter('pending')}
        >
          Pending
        </Button>
        <Button
          colorPalette={selectedStatus === 'sold' ? 'red' : 'gray'}
          variant={selectedStatus === 'sold' ? 'solid' : 'outline'}
          onClick={() => handleStatusFilter('sold')}
        >
          Sold
        </Button>
      </Stack>

      <Box mb={6}>
        <Button colorPalette="blue" onClick={handleCreatePet}>
          Create New Pet
        </Button>
      </Box>

      <CreatePetModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSuccess={handleModalSuccess}
      />

      <UpdatePetModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onSuccess={handleModalSuccess}
        petId={selectedPetId}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
        petName={selectedPetName}
        isDeleting={isDeleting}
      />

      {isLoading && (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      )}

      {error && !isLoading && (
        <Box p={4} bg="red.50" borderColor="red.200" borderWidth="1px" borderRadius="md">
          <Text color="red.600" fontWeight="medium">
            {error}
          </Text>
        </Box>
      )}

      {!isLoading && !error && (
        <PetTable pets={pets} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </Box>
  );
};

export default PetList;
