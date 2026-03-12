import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ============================================
// GANTI PASSWORD DI SINI
// Password default: "admin123"
// ============================================
const ADMIN_PASSWORD = "admin123";
const JWT_SECRET = "your-super-secret-jwt-key-change-this-in-production-2024";

// Hash password for comparison
const hashedPassword = bcryptjs.hashSync(ADMIN_PASSWORD, 10);

export async function verifyPassword(password: string): Promise<boolean> {
  return bcryptjs.compareSync(password, hashedPassword);
}

export function generateToken(): string {
  return jwt.sign(
    { role: 'admin', timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
