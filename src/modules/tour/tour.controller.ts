import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { BookTourDto } from './dto/book.dto';

import { ListTourInUserDto } from './dto/list.dto';
import { ReviewDto } from './dto/review.dto';
import { TourService } from './tour.service';
@ApiTags('tours')
@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}
  @Get()
  async getAll(@Res() res, @Query() query: ListTourInUserDto) {
    query.page = query.page || 1;
    query.limit = query.limit || 10;
    query.sortField = query.sortField || 'price';
    query.sort = query.sort || 'asc';

    let data = await this.tourService.getAll(query);

    res.render('user/tour/listTour', {
      tours: data.tours,
      c: data.c,
      des: data.des,
      query: query,
      desFilter: data?.desFilter?.name || '',
    });
  }
  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the tour id',
    schema: { type: 'integer' },
  })
  async tourDetail(@Param('id', ParseIntPipe) id, @Res() res) {
    const tour = await this.tourService.getOne(id);
    console.log(tour);
    res.render('user/tour/showTour', { t: tour });
  }
  @Auth('user')
  @Post('/book')
  async bookTour(@Body() data: BookTourDto, @Req() req) {
    console.log(data);
    let u = req.user;

    return this.tourService.bookTour(data, u);
  }

  @Auth('user')
  @Post('/review')
  async reviewTour(@Body() data: ReviewDto, @Req() req, @Res() res) {
    console.log(data);
    let r = await this.tourService.saveReview(data);
    res.redirect('back');
  }
  @Auth('user')
  @Post('/cancel')
  async cancelTour(@Body() data, @Res() res) {
    console.log(1111111, data);
    let id = Number(data.ticketId);
    await this.tourService.cancel(id);
    res.redirect('back');
  }
}
