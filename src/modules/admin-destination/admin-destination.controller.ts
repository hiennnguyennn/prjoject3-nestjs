import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Render,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { AdminDestinationService } from './admin-destination.service';
import { CreateDestinationDto } from './dto/create.dto';
import { Response } from 'express';
import { ListDestinationDto } from './dto/list.dto';
import { EditDestinationDto } from './dto/edit.dto';
@ApiTags('admin-destination')
@Controller('admin-destination')
export class AdminDestinationController {
  constructor(
    private readonly adminDestinationService: AdminDestinationService,
  ) {}

  @Auth('staff')
  @Get('/destinations')
  // @Render('admin/listDestination')
  async renderDestination(
    @Req() req,
    @Res() res: Response,
    @Query() data: ListDestinationDto,
  ) {
    data.page = data.page > 0 ? data.page : 1;
    data.limit = data.limit > 0 ? data.limit : 10;
    data.sortField = data.sortField ? data.sortField : 'createdAt';
    data.sort = data.sort ? data.sort : 'desc';
    const result = await this.adminDestinationService.getListDestinations(data);

    return res.render('admin/listDestination', {
      data,
      result,
      user: req.user,
    });
  }

  @Auth('manager')
  @Get('create-destinations')
  @Render('admin/createDestination')
  renderCreateDestination() {}

  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 5 }], {
      dest: './public/file/destinations',
    }),
  )
  @Auth('manager')
  @Post('/destinations')
  @ApiConsumes('multipart/form-data')
  async createDestination(
    @Res() Res,
    @Req() req,
    @Body() data: CreateDestinationDto,
    @UploadedFiles() file: Express.Multer.File[],
  ) {
    const des = await this.adminDestinationService.createDestination(
      req.user,
      data,
      file,
    );
    //return des;
    if (des) Res.redirect(`/admin-destination/destinations/${des['id']}`);
  }

  @Auth('manager')
  @Post('destinations/remove/:destinationId')
  //  @Redirect('http://localhost:3000/admin-destination/destination', 201)
  @ApiParam({
    name: 'destinationId',
    required: true,
    description: 'an integer for the destination id',
    //schema: { type: 'integer' },
  })
  async deleteDestination(@Param('destinationId') id, @Res() res: Response) {
    const result = await this.adminDestinationService.deleteDestination(id);
    //return { result };
    res.redirect('/admin-destination/destinations');
  }

  @Auth('staff')
  @Get('/destinations/:destinationId')
  @ApiParam({
    name: 'destinationId',
    required: true,
    description: 'an integer for the destination id',
    schema: { type: 'integer' },
  })
  async getDestinationDetail(
    @Param('destinationId', ParseIntPipe) id,
    @Res() res: Response,
  ) {
    const d = await this.adminDestinationService.getDestinationDetail(id);

    const firstImage = d.image.shift();
    res.render('admin/destinationDetail', {
      firstImage,
      d,
    });
  }
  @Auth('staff')
  @Get('/destinations/edit/:destinationId')
  @ApiParam({
    name: 'destinationId',
    required: true,
    description: 'an integer for the destination id',
    schema: { type: 'integer' },
  })
  async getEditDestination(
    @Param('destinationId', ParseIntPipe) id,
    @Res() res: Response,
  ) {
    const d = await this.adminDestinationService.getDestinationDetail(id);
    res.render('admin/editDestination', {
      d,
    });
  }

  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 5 }], {
      dest: './public/file/destinations',
    }),
  )
  @ApiConsumes('multipart/form-data')
  @Post('/destinations/edit/:destinationId')
  @ApiParam({
    name: 'destinationId',
    required: true,
    description: 'an integer for the destination id',
    schema: { type: 'integer' },
  })
  async editDestination(
    @Res() Res,
    @Req() req,
    @Body() data: EditDestinationDto,
    @UploadedFiles() file: Express.Multer.File[],
    @Param('destinationId', ParseIntPipe) id,
  ) {
    const d = await this.adminDestinationService.editDestination(
      req.user,
      data,
      file,
      id,
    );
    Res.redirect(`/admin-destination/destinations/${id}`);
  }
}
