import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { AdminCategoryService } from './admin-category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { listCategoryDto } from './dto/list.dto';
import { Response } from 'express';
@ApiTags('admin-category')
@Controller('admin-category')
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) {}
  @Auth('staff')
  @Get('/categories')
  // @Render('admin/listCategory')
  async renderTours(@Req() req, @Query() data: listCategoryDto, @Res() res) {
    data.page = data.page > 0 ? data.page : 1;
    data.limit = data.limit > 0 ? data.limit : 10;
    data.sort = data.sort ? data.sort : 'asc';
    const result = await this.adminCategoryService.getList(data);

    res.render('admin/listCategory', {
      data: data,
      result: result,
      user: req.user,
    });
  }
  @Get('/all')
  async getAll() {
    return this.adminCategoryService.getAll();
  }

  @Auth('manager')
  @Get('/create-category')
  @Render('admin/createCategory')
  renderCreateCategory() {}

  @Auth('manager')
  @Post('/categories')
  async createDestination(
    @Res() res,
    @Req() req,
    @Body() data: CreateCategoryDto,
  ) {
    const c = await this.adminCategoryService.createCategory(req.user, data);
    res.redirect('/admin-category/categories');
  }

  @Auth('manager')
  @Get('/categories/edit/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the category id',
    //schema: { type: 'integer' },
  })
  async editCategory(@Param('id') id, @Res() res) {
    const c = await this.adminCategoryService.getCategory(id);
    res.render('admin/editCategory', { c: c });
  }

  @Auth('manager')
  @Post('/categories/edit/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the category id',
  })
  async edit(
    @Param('id') id,
    @Body() data: CreateCategoryDto,
    @Res() Res: Response,
  ) {
    const c = await this.adminCategoryService.editCategory(id, data);

    Res.redirect('/admin-category/categories');
  }

  @Auth('manager')
  @Post('/categories/delete/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the category id',
  })
  async delete(@Param('id') id, @Res() Res: Response) {
    const c = await this.adminCategoryService.deleteCategory(id);

    Res.redirect('/admin-category/categories');
  }
}
