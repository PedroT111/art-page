import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { PayloadToken } from './models/payloadToken';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email, password);
    const user = await this.userService.findOne('email', email);
    console.log(user, 'user');
    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    return user;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterDto): Promise<{ access_token: string }> {
    const existingUser = await this.userService.findOne('email', user.email);
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: CreateUserDto = { ...user, password: hashedPassword };
    await this.userService.create(newUser);
    return this.login(newUser);
  }
}
