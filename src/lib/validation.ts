import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address').endsWith('@eastdelta.edu.bd'),
  password: passwordSchema,
});

export const studentLoginSchema = z.object({
  email: z.string().email('Invalid email address').endsWith('@eastdelta.edu.bd'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const validateInput = (input: string): string => {
  // Basic XSS prevention
  return input.replace(/[<>]/g, '');
};