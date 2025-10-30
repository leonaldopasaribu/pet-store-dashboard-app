import { useEffect, useState } from 'react';
import {
  Button,
  CloseButton,
  Dialog,
  Input,
  Portal,
  Stack,
  Textarea,
  Field,
} from '@chakra-ui/react';
import { updatePet, fetchPetById, type Pet } from '../api/pet-api';
import { toaster } from './ui/toaster';

type PetStatus = 'available' | 'pending' | 'sold';

interface UpdatePetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  petId: number | undefined;
}

export const UpdatePetModal = ({ isOpen, onClose, onSuccess, petId }: UpdatePetModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    categoryName: '',
    photoUrls: '',
    tagId: '',
    tagName: '',
    status: 'available' as PetStatus,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && petId) {
      loadPetData();
    }
  }, [isOpen, petId]);

  const loadPetData = async () => {
    if (!petId) return;

    try {
      setIsLoading(true);
      const pet = await fetchPetById(petId);

      setFormData({
        name: pet.name || '',
        categoryId: pet.category?.id?.toString() || '',
        categoryName: pet.category?.name || '',
        photoUrls: pet.photoUrls?.join(', ') || '',
        tagId: pet.tags?.[0]?.id?.toString() || '',
        tagName: pet.tags?.[0]?.name || '',
        status: pet.status || 'available',
      });
    } catch (err) {
      console.error('Error loading pet data:', err);
      toaster.create({
        title: 'Error',
        description: 'Failed to load pet data',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFormData({
      name: '',
      categoryId: '',
      categoryName: '',
      photoUrls: '',
      tagId: '',
      tagName: '',
      status: 'available',
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toaster.create({
        title: 'Validation Error',
        description: 'Pet name is required',
        type: 'error',
      });
      return;
    }

    if (!petId) return;

    setIsSubmitting(true);

    try {
      const updatedPet: Pet = {
        id: petId,
        name: formData.name,
        photoUrls: formData.photoUrls ? formData.photoUrls.split(',').map(url => url.trim()) : [],
        status: formData.status,
      };

      // Add category if provided
      if (formData.categoryName || formData.categoryId) {
        updatedPet.category = {
          id: formData.categoryId ? Number(formData.categoryId) : undefined,
          name: formData.categoryName || undefined,
        };
      }

      // Add tags if provided
      if (formData.tagName || formData.tagId) {
        updatedPet.tags = [
          {
            id: formData.tagId ? Number(formData.tagId) : undefined,
            name: formData.tagName || undefined,
          },
        ];
      }

      await updatePet(updatedPet);

      toaster.create({
        title: 'Success',
        description: 'Pet updated successfully',
        type: 'success',
      });

      handleClose();
      onSuccess();
    } catch (err) {
      console.error('Error updating pet:', err);
      toaster.create({
        title: 'Error',
        description: 'Failed to update pet',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={e => !e.open && handleClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="600px">
            <Dialog.Header>
              <Dialog.Title>Update Pet</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              {isLoading ? (
                <div>Loading pet data...</div>
              ) : (
                <Stack gap={4}>
                  <Field.Root required>
                    <Field.Label>Pet Name</Field.Label>
                    <Input
                      placeholder="Enter pet name"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Status</Field.Label>
                    <Stack direction="row" gap={2}>
                      <Button
                        size="sm"
                        colorPalette={formData.status === 'available' ? 'green' : 'gray'}
                        variant={formData.status === 'available' ? 'solid' : 'outline'}
                        onClick={() => handleFormChange('status', 'available')}
                      >
                        Available
                      </Button>
                      <Button
                        size="sm"
                        colorPalette={formData.status === 'pending' ? 'orange' : 'gray'}
                        variant={formData.status === 'pending' ? 'solid' : 'outline'}
                        onClick={() => handleFormChange('status', 'pending')}
                      >
                        Pending
                      </Button>
                      <Button
                        size="sm"
                        colorPalette={formData.status === 'sold' ? 'blue' : 'gray'}
                        variant={formData.status === 'sold' ? 'solid' : 'outline'}
                        onClick={() => handleFormChange('status', 'sold')}
                      >
                        Sold
                      </Button>
                    </Stack>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Category ID</Field.Label>
                    <Input
                      placeholder="Enter category ID (optional)"
                      type="number"
                      value={formData.categoryId}
                      onChange={(e) => handleFormChange('categoryId', e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Category Name</Field.Label>
                    <Input
                      placeholder="Enter category name (e.g., Dogs, Cats)"
                      value={formData.categoryName}
                      onChange={(e) => handleFormChange('categoryName', e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Photo URLs</Field.Label>
                    <Textarea
                      placeholder="Enter photo URLs separated by commas"
                      value={formData.photoUrls}
                      onChange={(e) => handleFormChange('photoUrls', e.target.value)}
                      rows={3}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Tag ID</Field.Label>
                    <Input
                      placeholder="Enter tag ID (optional)"
                      type="number"
                      value={formData.tagId}
                      onChange={(e) => handleFormChange('tagId', e.target.value)}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Tag Name</Field.Label>
                    <Input
                      placeholder="Enter tag name (optional)"
                      value={formData.tagName}
                      onChange={(e) => handleFormChange('tagName', e.target.value)}
                    />
                  </Field.Root>
                </Stack>
              )}
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting || isLoading}
                >
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="blue"
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={isLoading}
              >
                Update Pet
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild onClick={handleClose}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
