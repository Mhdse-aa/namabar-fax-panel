import api from './client';

/**
 * ارسال نهایی فکس
 * @param {Object} data 
 */
export const sendFax = async ({ to, file_id, description = '', tries = 1 }) => {
  try {
    const response = await api.post('/panel/faxes', {
      to,         
      file_id,    
      tries,      
      description,
      callback_url: 'http://google.com' 
    });
    return response.data;
  } catch (error) {
    console.error('Send Fax Error:', error);
    throw error;
  }
};
