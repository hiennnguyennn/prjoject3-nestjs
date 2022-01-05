import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { AdminUserService } from './admin-users.service';
import { EditUserTypeDto } from './dto/editUserType.dto';
import { ListUserDto } from './dto/listUser.dto';
@ApiTags('admin-user')
@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}
  @Get('/users')
  //@Render('admin/listUser')
  async renderUsers(@Query() data: ListUserDto, @Req() req, @Res() Res) {
    data.page = data.page > 0 ? data.page : 1;
    data.limit = data.limit > 0 ? data.limit : 10;

    data.sort = data.sort ? data.sort : 'asc';
    const u = await this.adminUserService.getListUser(data);
    console.log(u);
    Res.render('admin/listUser', { user: req.user, result: u, data: data });
  }

  @Auth('staff')
  @Get('/users/:userId')
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'an integer for the user id',
    schema: { type: 'integer' },
  })
  async renderUserDetail(@Param('userId', ParseIntPipe) id, @Res() res) {
    const u = await this.adminUserService.getUserDetail(id);
    res.render('admin/userDetail', {
      u,
    });
  }

  @Auth('manager')
  @Post('/users/editUserType/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the user id',
    schema: { type: 'integer' },
  })
  async changeAdminType(
    @Param('id', ParseIntPipe) id,
    @Body() role,
    @Res() res,
  ) {
    const u = await this.adminUserService.editUserRole(id, role);
    res.redirect(`/admin-user/users/${u.id}`);
  }

  @Auth('manager')
  @Post('/users/editUserStatus/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the user id',
    schema: { type: 'integer' },
  })
  async changeUserStatus(@Param('id', ParseIntPipe) id, @Res() res) {
    const u = await this.adminUserService.editUserStatus(id);
    console.log(111, id, u);
    res.redirect(`/admin-user/users/${id}`);
  }

  // @Auth('staff')
  // @Get('/listUsers')
  // getListUser(@Query() data: ListUserDto) {
  //   return this.adminUserService.getListUser(data);
  // }
}
