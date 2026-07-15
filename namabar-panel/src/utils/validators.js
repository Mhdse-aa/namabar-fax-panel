export function validateMobile(value) {
  const mobileRegex = /^09\d{9}$/;
  return mobileRegex.test(value);
}

export function validateRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}
