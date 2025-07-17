// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async register(dto: RegisterDto) {
    return {
      message: 'Registered successfully',
      data: dto,
    };
  }

  async login(dto: LoginDto) {
    return {
      message: 'Login successful',
      token: 'dummy-jwt-token',
      email: dto.email,
    };
  }
}
