import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { Auth } from 'src/common/decorator/auth.decorator';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
