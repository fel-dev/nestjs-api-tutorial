import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // Hash the password
    const hash = await argon.hash(dto.password);
    // Save the user to the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;

      // Return the user
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'User with this email already exists.',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // Find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if the user is not found, throw an error
    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect.',
      );
    }
    // Compare the password with the hash
    const isPasswordValid = await argon.verify(
      user.hash,
      dto.password,
    );
    // if the password is incorrect, throw an exception
    if (!isPasswordValid) {
      throw new ForbiddenException(
        'Credentials incorrect.',
      );
    }
    // send back the user
    delete user.hash;
    return user;
  }
}
