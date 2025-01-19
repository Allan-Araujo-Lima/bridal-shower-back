import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(email: string, password: string): Promise<any> {
    const user_data = await this.userService.findOneWithEmail(email);

    if (!user_data) {
      throw new HttpException('User not found', 404);
    }
    if (!user_data.password) {
      throw new HttpException('No password set for this profile', HttpStatus.BAD_REQUEST)
    }

    const isEqual = await bcrypt.compare(password, user_data.password)

    if (!isEqual) {
      throw new HttpException('Wrong password or email', 400);
    }

    const payload = {
      sub: user_data.id,
      email: user_data.email,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async getUser(req: any): Promise<any> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }
}
