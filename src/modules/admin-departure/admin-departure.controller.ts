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
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { AdminDepartureService } from './admin-departure.service';
import { Response } from 'express';
import { TourRepository } from '../tour/tour.repository';
import * as Amadeus from 'amadeus';
import { ListDepartureDto } from './dto/list.dto';

@Controller('admin-departure')
export class AdminDepartureController {
  constructor(
    private readonly departureService: AdminDepartureService,
    private readonly tourRepository: TourRepository,
  ) {}
  @Auth('staff')
  @Get('/departures')
  // @Render('admin/listTourDeparture')
  async renderTours(@Query() data: ListDepartureDto, @Res() res, @Req() req) {
    data.limit = data.limit || 10;
    data.page = data.page || 1;
    let d = await this.departureService.getAll(data);
    console.log(req.user);
    res.render('admin/listTourDeparture', { d: d, data: data, user: req.user });
  }

  @Auth('manager')
  @ApiQuery({
    name: 'departure',
    type: Number,
    required: false,
  })
  @Get('/createTourDeparture')
  // @Render('admin/createTourDeparture')
  async renderCreateTourDeparture(
    @Res() res,
    @Query('page', ParseIntPipe) page = 1,
    @Query('departure') departure?: number,
  ) {
    if (page === 1) {
      const t = await this.departureService.getAllTour();
      res.render('admin/createTourDeparture', { tours: t });
    } else if (page === 2 && departure) {
      const d = await this.departureService.getOneById(departure);

      res.render('admin/createDeparture2', { departure: d });
    }
  }

  @Auth('manager')
  @Post('/create2')
  async getFlight(@Body() data) {
    const r = await this.departureService.getFlight(data);

    console.log(1111111111111);
    return r;
    // res.render(`/admin-departure/${id}`, { result: f });
  }
  @Auth('manager')
  @Get('/create3')
  async saveFlight(@Query() data, @Res() res) {
    const r = await this.departureService.saveFlight(data);
    console.log(1111111111111, data);
    res.redirect(`/admin-tour/tours/${data.id}`);
    // res.render(`/admin-departure/${id}`, { result: f });
  }

  @Auth('manager')
  @Post('/create')
  async saveDeparture(@Body() data, @Req() req, @Res() Res) {
    const d = await this.departureService.createDeparture(data, req.user.id);
    Res.redirect(
      `/admin-departure/createTourDeparture?departure=${d.id}&page=2`,
    );
  }

  @Get('/api/autocomplete')
  async getFightAutoComplete(@Query('keyword') word, @Res() res) {
    try {
      const amadeus = new Amadeus({
        clientId: process.env.API_KEY,
        clientSecret: process.env.API_SECRET,
      });
      const { data } = await amadeus.referenceData.locations.get({
        keyword: word,
        subType: Amadeus.location.city,
      });
      //   console.log(data);
      res.json(data);
    } catch (error) {
      console.error(error.response);
    }
  }
  @Post('/departures/delete/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the departure id',
    //schema: { type: 'integer' },
  })
  async delete(@Param('id') id: number, @Res() res) {
    await this.departureService.delete(id);
    res.redirect('back');
  }
}
