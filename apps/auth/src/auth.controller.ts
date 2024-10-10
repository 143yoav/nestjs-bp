import { Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './users/current-user.decorator';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('notifications') private readonly tcpClilent: ClientProxy,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('***********************************************');
    this.tcpClilent.emit('user-logged-in', 'null');
    this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JWTAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
