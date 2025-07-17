import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(dto: LoginDto) {
    // Replace this with your real user validation logic
    if (dto.email === 'doctor1@example.com' && dto.password === '123456') {
      const user = { id: 1, email: dto.email, role: 'doctor' };

      const payload = {
        email: user.email,
        role: user.role,
      };
      console.log('🔐 Generating JWT for user:', user);
      const token = this.jwtService.sign(payload, {
        subject: user.id.toString(),
      });

      return {
        message: 'Login successful',
        token,
        email: user.email,
      };
    }

    throw new Error('Invalid credentials');
  }

  async register(dto: SignupDto) {
  // 🔒 Normally you'd check if user already exists and hash password
  const newUser = {
    id: Date.now(), // 👈 Mocked unique ID
    email: dto.email,
    password: dto.password, // ⚠️ In real app, hash the password!
    role: dto.role || 'doctor',
  };

  const payload = {
    email: newUser.email,
    role: newUser.role,
  };

  console.log('🆕 Registering new user:', newUser);

  const token = this.jwtService.sign(payload, {
    subject: newUser.id.toString(),
  });

  return {
    message: 'Registration successful',
    token,
    email: newUser.email,
  };
}
}
