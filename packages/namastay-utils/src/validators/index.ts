export const validateField = (
  value: unknown,
  rejectionCriteria: unknown[] = [undefined, null, '']
): boolean => !rejectionCriteria.includes(value);

export const checkIfRegistrationIsCompleted = (userObject?: {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}): boolean =>
  validateField(userObject?.email) ||
  validateField(userObject?.firstName) ||
  validateField(userObject?.lastName) ||
  validateField(userObject?.phone);

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
