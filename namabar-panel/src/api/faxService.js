import api from './client';

/**
 * ارسال نهایی فکس
 * @param {Object} data شامل شماره مقصد، آیدی فایل و توضیحات
 */
export const sendFax = async ({ to, file_id, description = '', tries = 1 }) => {
  try {
    const response = await api.post('/panel/faxes', {
      to,          // شماره مقصد (مثلاً 021xxxxxxx)
      file_id,     // همان آیدی که از آپلود گرفتیم
      tries,       // تعداد تلاش مجدد (پیش‌فرض 1)
      description,
      callback_url: 'http://google.com' // مطابق نمونه مستندات شما
    });
    return response.data;
  } catch (error) {
    console.error('Send Fax Error:', error);
    throw error;
  }
};
