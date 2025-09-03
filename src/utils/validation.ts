// src/utils/validation.ts

/**
 * Validation utility functions for authentication forms
 */

// Email validation
export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  
  return '';
};

// Password validation
export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  
  return '';
};

// Strong password validation (for registration)
export const validateStrongPassword = (password: string): string => {
  const basicValidation = validatePassword(password);
  if (basicValidation) {
    return basicValidation;
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain uppercase, lowercase, and number';
  }
  
  return '';
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return '';
};

// Full name validation
export const validateFullName = (fullName: string): string => {
  if (!fullName.trim()) {
    return 'Full name is required';
  }
  
  if (fullName.trim().length < 2) {
    return 'Full name must be at least 2 characters';
  }
  
  return '';
};

// Login form validation
export const validateLoginForm = (email: string, password: string): { email: string; password: string; isValid: boolean } => {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  
  return {
    email: emailError,
    password: passwordError,
    isValid: !emailError && !passwordError
  };
};

// Registration form validation
export const validateRegistrationForm = (
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
): { fullName: string; email: string; password: string; confirmPassword: string; isValid: boolean } => {
  const fullNameError = validateFullName(fullName);
  const emailError = validateEmail(email);
  const passwordError = validateStrongPassword(password);
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  
  return {
    fullName: fullNameError,
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
    isValid: !fullNameError && !emailError && !passwordError && !confirmPasswordError
  };
};