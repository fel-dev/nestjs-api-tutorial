import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
    signup() {
        return { message: 'Hello World! I am signing up...'}
    }
    signin() {
        return { message: 'Hello World! I am signing in...'}
    }
}
