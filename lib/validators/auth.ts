import type { LoginForm, SignupForm } from "@/lib/types/auth";

export function normalizeNepalPhone(phone: string) {
  const cleaned = phone.replace(/[\s-]/g, "");

  if (cleaned.startsWith("+977")) {
    return cleaned.slice(4);
  }

  if (cleaned.startsWith("977")) {
    return cleaned.slice(3);
  }

  return cleaned;
}

export function isValidNepalMobile(phone: string) {
  return /^9[678]\d{8}$/.test(phone);
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLogin(values: LoginForm) {
  const errors: Partial<LoginForm> = {};

  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email.";

  if (!values.password.trim()) errors.password = "Password is required.";

  if (values.password.length < 8)
    errors.password = "Password must be greater than 8.";

  return errors;
}

export function validateSignup(values: SignupForm) {
  const errors: Partial<SignupForm> = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email.";
  if (!values.password.trim()) errors.password = "Password is required.";
  else if (values.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  }

  return errors;
}
