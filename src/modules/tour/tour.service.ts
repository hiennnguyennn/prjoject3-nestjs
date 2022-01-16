import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../admin-category/category.repository';
import { DestinationRepository } from '../destination/destination.repository';
import { UserRepository } from '../user/user.repository';
import { TicketRepository } from './ticket.repository';
import { BookTourDto } from './dto/book.dto';
import { ListTourInUserDto } from './dto/list.dto';
import { ReviewRepository } from './review.repository';

import { TourRepository } from './tour.repository';
import { DepartureRepository } from '../admin-departure/departure.repository';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class TourService {
  constructor(
    private readonly tourRepository: TourRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly destinationRepository: DestinationRepository,
    private readonly userRepository: UserRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly departureRepository: DepartureRepository,
  ) {}
  async getAll(data: ListTourInUserDto) {
    let tours = await this.tourRepository.getListInUser(data);

    for (var i = 0; i < tours.items.length; i++) {
      tours.items[i]['tour_image'] = tours.items[i]['tour_image'].split(',');
      console.log(111, tours.items[i]['tour_id']);
      tours.items[i]['tickets'] = Number(
        (await this.ticketRepository.countTicketTour(tours.items[i]['tour_id']))
          .count,
      );
    }
    // console.log(tours.items);
    let desFilter;
    if (data.destination)
      desFilter = await this.destinationRepository.getDestinationbyId(
        data.destination,
      );
    let c = await this.categoryRepository.getAll();
    let des = await this.destinationRepository.getList();
    return { tours, c, des, desFilter };
  }
  async getOne(id: number) {
    let tour = await this.tourRepository.getTourById(id);
    for (var i = 0; i < tour.departures.length; i++) {
      if (tour.departures[i].status == 3) tour.departures.splice(i, 1);
    }
    tour['review'] = await this.reviewRepository.getReviewTour(tour.id);

    tour['tickets'] = Number(
      (await this.ticketRepository.countTicketTour(tour.id)).count,
    );
    console.log(1111, tour['tickets']);
    tour['include'] = tour.included.split(';');
    tour['notInclude'] = tour.notIncluded.split(';');
    for (var i = 0; i < tour.plans.length; i++) {
      tour.plans[i]['include'] = tour.plans[i].included.split(';');
      tour.plans[i]['notInclude'] = tour.plans[i].notIncluded.split(';');
    }

    for (var i = 0; i < tour.departures.length; i++) {
      tour.departures[i]['sold'] = Number(
        (
          await this.ticketRepository.countTicketDeparture(
            tour.departures[i].id,
          )
        ).count,
      );
    }
    tour['showImage'] = tour.image.slice(0, 5);

    return tour;
  }
  async saveReview(data: ReviewDto) {
    // let u = await this.userRepository.findUserById(user.id);
    // data['owner'] = u;
    // let d = await this.departureRepository.getOne(data.departureId);
    // data['departure'] = d;
    let ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.id= :id', { id: data.ticketId })
      .getOne();
    data['ticket'] = ticket;
    await this.reviewRepository.save(data);
    ticket.status = 4;
    await ticket.save();
    return 'success';
  }
  async bookTour(data: BookTourDto, user) {
    let t = await this.ticketRepository.findUserDepartureBooking(
      user.id,
      data.departureId,
    );
    if (t) throw new BadRequestException('Account booked');
    else {
      let d = await this.departureRepository.getOne(data.departureId);
      let u = await this.userRepository.findUserByEmailAndRole(user.mail, [0]);
      if (!u.phone || !u.address)
        throw new BadRequestException(
          'Please add information about your phone, address first',
        );
      data['owner'] = u;
      data['departure'] = d;
      data['status'] = 0;
      let result = await this.ticketRepository.save(data);
      return result;
    }
  }
  async cancel(ticketId: number) {
    let ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.id= :id', { id: ticketId })
      .getOne();
    ticket.status = 5;
    return await ticket.save();
  }
}
