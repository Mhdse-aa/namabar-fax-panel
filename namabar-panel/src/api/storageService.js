import api from './client';

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('document', file);

  try {
    const response = await api.post('/storage/documents', formData);
    return response.data?.value?.file?.id;
  } catch (error) {
    console.error('Validation Error Details:', error.response?.data);
    console.error('Validation first error:', error.response?.data?.errors?.[0]);
    throw error;
  }
};
