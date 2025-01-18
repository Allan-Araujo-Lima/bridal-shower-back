import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user_data = await this.userService.findByEmail(email);

    if (!user_data) {
      throw new NotFoundException('User not found');
    }
    if (!user_data.password) {
      throw new HttpException('No password set for this profile', HttpStatus.BAD_REQUEST)
    }

    const isEqual = await bcrypt.compare(password, user_data.password)

    if (!isEqual) {
      throw new HttpException("Wrong password or email", HttpStatus.BAD_REQUEST)
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
