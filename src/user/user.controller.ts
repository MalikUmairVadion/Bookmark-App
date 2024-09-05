import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Put()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.usersService.editUser(userId, dto);
  }
}
