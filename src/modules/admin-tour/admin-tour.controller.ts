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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { CategoryRepository } from '../admin-category/category.repository';
import { AdminTourService } from './admin-tour.service';
import { CreateTourDto } from './dto/create.dto';
import { EditTourDto } from './dto/edit.dto';
import { ListTourDto } from './dto/list.dto';
@ApiTags('admin-tour')
@Controller('admin-tour')
export class AdminTourController {
  constructor(
    private readonly adminTourSerive: AdminTourService,
    private readonly categoryRepository: CategoryRepository,
  ) {}
  @Auth('staff')
  @Get('/tours')
  // @Render('admin/listTours')
  async renderTours(@Res() Res, @Query() data: ListTourDto, @Req() req) {
    data.page = data.page > 0 ? data.page : 1;
    data.limit = data.limit > 0 ? data.limit : 10;
    data.sort = data.sort ? data.sort : 'desc';
    const tour = await this.adminTourSerive.getList(data);
    console.log(1111, tour);
    Res.render('admin/listTours', {
      result: tour,
      data: data,
      user: req.user,
    });
  }

  @Auth('manager')
  @Get('/create-tour')
  //@Render('admin/createTour')
  async renderCreateTour(@Res() res) {
    const des = await this.adminTourSerive.getListDestination();
    const listCategory = await this.categoryRepository.getAll();

    res.render('admin/createTour', { des: des, category: listCategory });
  }

  @Auth('manager')
  @Get('/tours/edit/:tourId')
  @ApiParam({
    name: 'tourId',
    required: true,
    description: 'an integer for the tour id',
    schema: { type: 'integer' },
  })
  async renderEditTour(@Param('tourId', ParseIntPipe) id, @Res() res) {
    const tour = await this.adminTourSerive.getTour(id);

    let des = await this.adminTourSerive.getListDestination();
    let desId = [];
    for (var i = 0; i < tour.destinations.length; i++) {
      desId.push(tour.destinations[i].id);
    }

    res.render('admin/editTour', { t: tour, des: des, desId: desId, id: id });
  }

  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 5 }], {
      dest: './public/file/tours',
    }),
  )
  @Auth('manager')
  @Post('/tours')
  @ApiConsumes('multipart/form-data')
  async createTour(
    @Req() req,
    @Body() data: CreateTourDto,
    @UploadedFiles() file: Express.Multer.File[],
    @Res() res,
  ) {
    //  return data;
    console.log(data);
    const tour = await this.adminTourSerive.createTour(req.user, data, file);
    res.redirect(`/admin-tour/tours/${tour.id}`);
  }

  @Auth('staff')
  @Get('/tours/:tourId')
  @ApiParam({
    name: 'tourId',
    required: true,
    description: 'an integer for the tour id',
    schema: { type: 'integer' },
  })
  async getTourDetail(@Param('tourId', ParseIntPipe) id, @Res() res) {
    let t = await this.adminTourSerive.tourDetail(id);
    console.log(t);
    const firstImage = t['image'].shift();
    res.render('admin/tourDetail', {
      firstImage,
      t,
    });
    // const d = await this.adminTourSerive.getDestinationDetail(id);
    // console.log(d);
    // const firstImage = d.image.shift();
    // res.render('admin/destinationDetail', {
    //   firstImage,
    //   d,
    // });
  }

  @Auth('manager')
  @Post('tours/remove/:tourId')
  @ApiParam({
    name: 'tourId',
    required: true,
    description: 'an integer for the tour id',
  })
  async deleteTour(@Param('tourId') id, @Res() res) {
    const result = await this.adminTourSerive.deleteTour(id);
    //return { result };
    res.redirect('/admin-tour/tours');
  }

  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 5 }], {
      dest: './public/file/tours',
    }),
  )
  @ApiConsumes('multipart/form-data')
  @Post('/tours/edit/:tourId')
  @ApiParam({
    name: 'tourId',
    required: true,
    description: 'an integer for the tour id',
    schema: { type: 'integer' },
  })
  async editTour(
    @Res() Res,
    @Req() req,
    @Body() data: EditTourDto,
    @UploadedFiles() file: Express.Multer.File[],
    @Param('tourId', ParseIntPipe) id,
  ) {
    const d = await this.adminTourSerive.editTour(req.user, data, file, id);
    Res.redirect(`/admin-tour/tours/${id}`);
  }

  @Post('/editHot/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the tour id',
    schema: { type: 'integer' },
  })
  async editHotTour(@Param('id', ParseIntPipe) id, @Res() res) {
    console.log(id);
    const t = await this.adminTourSerive.editHotTour(id);
    res.redirect('back');
  }
}
