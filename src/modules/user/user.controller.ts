import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Auth } from 'src/common/decorator/auth.decorator';

import { UserService } from './user.service';
import { Response } from 'express';
import { EditUserDto } from './dto/edit.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Auth('user')
  @Get('/infoLogin')
  async infoLogin(@Req() req) {
    return req.user;
  }

  @Auth('user')
  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    res.redirect('/auth/login');
  }
  @Auth('user')
  @Get('/profile')
  async showProfile(@Req() req, @Res() res) {
    let u = await this.userService.getInfo(req.user.id);
    console.log(1111, u);
    res.render('user/editInfo', { u: u });
  }
  @Auth('user')
  @Post('/edit')
  async editUserProfile(@Req() req, @Body() data: EditUserDto, @Res() res) {
    let u = await this.userService.editProfile(data, req.user.id);
    res.redirect('back');
  }
}
