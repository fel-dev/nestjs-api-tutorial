import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }
  // request POST http://localhost:3000/auth/signin
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}