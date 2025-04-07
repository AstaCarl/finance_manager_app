import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

    async upgrade(userId: number) {
      return this.usersService.upgrade(userId)
    }

  async signup(user: any) {
    const existingUser = await this.usersService.findOne(user.username);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    return this.usersService.create(user.username, user.password);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      // console.log("user found removed password", result);
      
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userFromDb = await this.usersService.findOne(user.username);

    const payload = { 
      username: user.username, id: userFromDb.id
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}