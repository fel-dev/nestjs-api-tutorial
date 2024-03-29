import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return 'User is signin up...';
  }
  // request POST http://localhost:3000/auth/signin
  @Post('signin')
  signin() {
    return { message: 'User is signing in...'}
  }
}