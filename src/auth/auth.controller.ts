import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterCustomerDto } from './dto/register.customer.dto';
import { Response } from 'express';
import { RegisterAdminDto } from './dto/register.admin.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  @Render('user/login')
  showLoginPage() {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async handleLoginUser(
    @Body() data: LoginDto,
    @Req() req,
    @Res({ passthrough: true }) Res: Response,
  ) {
    var jwt = await this.authService.login(req.user);
    Res.cookie('jwt', jwt);

    Res.redirect('/');
  }

  @Get('/register')
  @Render('user/register')
  showRegisterPage() {}

  @Post('/register')
  async handleRegisterCustomer(
    @Body() data: RegisterCustomerDto,
    @Res({ passthrough: true }) Res: Response,
  ) {
    const result = await this.authService.registerUser(data);
    Res.cookie('jwt', result);
    // return Res.redirect('');
  }

  @Get('/admin/register')
  @Render('admin/register-admin')
  renderRegisterAdmin() {}

  @Get('/admin/login')
  @Render('admin/login-admin')
  renderLoginAdmin() {}

  @Post('/admin/register')
  async handleRegister(
    @Body() data: RegisterAdminDto,
    @Res({ passthrough: true }) Res: Response,
  ) {
    const result = await this.authService.registerAdmin(data);
    Res.cookie('jwt', result);
  }

  @Post('/admin/login')
  async handleLogin(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) Res: Response,
  ) {
    const result = await this.authService.loginAdmin(data);
    Res.cookie('jwt', result);
    Res.redirect('/admin');
  }
}
