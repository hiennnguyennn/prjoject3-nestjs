import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CategoryRepository } from './modules/admin-category/category.repository';
import { DestinationRepository } from './modules/destination/destination.repository';
import { TourRepository } from './modules/tour/tour.repository';
import { UserRepository } from './modules/user/user.repository';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly destinationReository: DestinationRepository,
    private readonly userRepository: UserRepository,
    private readonly tourRepository: TourRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}
  @Get('')
  // @Render('user/home')
  async showHomePage(@Res() Res, @Req() req) {
    const hotTours = await this.tourRepository.get5HotTours();
    const newTours = await this.tourRepository.get5NewTours();
    const category = await this.categoryRepository.getAll();
    let hotNewTours = hotTours.concat(newTours);

    this.shuffle(hotNewTours);

    const des = await this.destinationReository.getList();

    const tours = await this.tourRepository.getList();

    Res.render('user/home', { hotNewTours, des, tours, category });
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  @Get('/admin')
  showHomePageAdmin(@Res() res) {
    res.redirect('/admin-tour/tours');
  }
  @Get('/find')
  @ApiQuery({
    name: 'keyword',
    required: true,
    description: 'an integer for the tour id',
    schema: { type: 'integer' },
  })
  async findByDesOrTourName(@Query('keyword') data: string) {
    let t = await this.tourRepository.searchTour(data);
    let d = await this.destinationReository.search(data);
    let result = [];
    for (var i = 0; i < t.length; i++) {
      t[i]['type'] = 'tour';
      result.push(t[i]);
    }
    for (var i = 0; i < d.length; i++) {
      d[i]['type'] = 'destination';
      result.push(d[i]);
    }

    return result;
  }
}
