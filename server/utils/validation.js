export const validateInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  // Basic XSS prevention
  return input.replace(/[<>]/g, '').trim();
};