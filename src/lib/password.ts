import "server-only";
import bcrypt from "bcryptjs";

/**
 * SERVER-ONLY. Passwords are never stored or compared in plaintext
 * anywhere in this codebase — only bcrypt hashes.
 */
const SALT_ROUNDS = 12;

export async function hashPassword(plainTextPassword: string): Promise<string> {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

export async function verifyPassword(
  plainTextPassword: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, passwordHash);
}
