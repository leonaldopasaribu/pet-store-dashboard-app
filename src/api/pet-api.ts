import axios, { type AxiosInstance } from 'axios';

const BASE_URL = 'https://petstore3.swagger.io/api/v3';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10_000,
});

export interface Pet {
  id?: number;
  name: string;
  category?: {
    id?: number;
    name?: string;
  };
  photoUrls: string[];
  tags?: Array<{
    id?: number;
    name?: string;
  }>;
  status?: 'available' | 'pending' | 'sold';
}

export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

export const createPet = async (pet: Pet): Promise<Pet> => {
  try {
    const response = await apiClient.post<Pet>('/pet', pet);
    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

export const updatePet = async (pet: Pet): Promise<Pet> => {
  try {
    const response = await apiClient.put<Pet>('/pet', pet);
    return response.data;
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};

export const deletePet = async (petId: number): Promise<void> => {
  try {
    await apiClient.delete(`/pet/${petId}`);
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
};

export const fetchPetById = async (petId: number): Promise<Pet> => {
  try {
    const response = await apiClient.get<Pet>(`/pet/${petId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting pet:', error);
    throw error;
  }
};

export const findPetsByStatus = async (
  status: 'available' | 'pending' | 'sold' = 'available'
): Promise<Pet[]> => {
  try {
    const response = await apiClient.get<Pet[]>('/pet/findByStatus', {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error('Error finding pets by status:', error);
    throw error;
  }
};

export const findPetsByTags = async (tags: string[]): Promise<Pet[]> => {
  try {
    const response = await apiClient.get<Pet[]>('/pet/findByTags', {
      params: { tags },
      paramsSerializer: {
        indexes: null,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error finding pets by tags:', error);
    throw error;
  }
};

export const updatePetWithForm = async (
  petId: number,
  name?: string,
  status?: string
): Promise<void> => {
  try {
    const formData = new URLSearchParams();
    if (name) formData.append('name', name);
    if (status) formData.append('status', status);

    await apiClient.post(`/pet/${petId}`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  } catch (error) {
    console.error('Error updating pet with form:', error);
    throw error;
  }
};

export const uploadPetImage = async (
  petId: number,
  file: File,
  additionalMetadata?: string
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (additionalMetadata) {
      formData.append('additionalMetadata', additionalMetadata);
    }

    const response = await apiClient.post<ApiResponse>(`/pet/${petId}/uploadImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading pet image:', error);
    throw error;
  }
};

export default {
  createPet,
  updatePet,
  deletePet,
  fetchPetById,
  findPetsByStatus,
  findPetsByTags,
  updatePetWithForm,
  uploadPetImage,
  apiClient, // Export instance for custom requests
};
