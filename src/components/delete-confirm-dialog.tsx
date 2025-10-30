import { Button, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  petName?: string;
  isDeleting?: boolean;
}

export const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  petName,
  isDeleting = false,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="400px">
            <Dialog.Header>
              <Dialog.Title>Delete Pet</Dialog.Title>
            </Dialog.Header>
            
            <Dialog.Body>
              <Text>
                Are you sure you want to delete {petName ? `"${petName}"` : 'this pet'}? 
                This action cannot be undone.
              </Text>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose} disabled={isDeleting}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button 
                colorPalette="red" 
                onClick={onConfirm}
                loading={isDeleting}
              >
                Delete
              </Button>
            </Dialog.Footer>
            
            <Dialog.CloseTrigger asChild onClick={onClose}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
