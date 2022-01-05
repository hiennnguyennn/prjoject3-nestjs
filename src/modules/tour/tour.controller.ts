import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { DestinationRepository } from '../destination/destination.repository';
import { DestinationService } from '../destination/destination.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { TourService } from './tour.service';

@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}
  @Get()
  async getAll(@Res() res) {
    const t = await this.tourService.getAll();
    console.log(t);
    res.render('user/tour/listTour', { tours: t });
  }
  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the tour id',
    schema: { type: 'integer' },
  })
  async DestinationDetail(@Param('id', ParseIntPipe) id, @Res() res) {
    const tour = await this.tourService.getOne(id);
    tour['include'] = tour.included.split(';');
    tour['notInclude'] = tour.notIncluded.split(';');
    for (var i = 0; i < tour.plans.length; i++) {
      tour.plans[i]['include'] = tour.plans[i].included.split(';');
      tour.plans[i]['notInclude'] = tour.plans[i].notIncluded.split(';');
    }
    console.log(tour);
    res.render('user/tour/showTour', { t: tour });
  }
}
