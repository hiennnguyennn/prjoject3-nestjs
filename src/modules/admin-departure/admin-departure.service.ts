import { Injectable } from '@nestjs/common';
import { TourRepository } from '../tour/tour.repository';
import { UserRepository } from '../user/user.repository';
import { DepartureRepository } from './departure.repository';
import { Departure } from './entities/departure.entity';
import * as Amadeus from 'amadeus';
import { DestinationRepository } from '../destination/destination.repository';
import { ListDepartureDto } from './dto/list.dto';
import { TicketRepository } from '../tour/ticket.repository';
@Injectable()
export class AdminDepartureService {
  constructor(
    private readonly departureRepository: DepartureRepository,
    private readonly userRepository: UserRepository,
    private readonly tourRepository: TourRepository,
    private readonly destinationRepository: DestinationRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  async createDeparture(data, userId) {
    const u = await this.userRepository.findUserById(userId);
    let t = await this.tourRepository.getTourById(Number(data.tour));
    let start = t.timeStart.split(':');
    let end = t.timeReturn.split(':');
    data.start = new Date(data.start);
    data.start.setHours(start[0]);
    data.start.setMinutes(start[1]);
    data.end = new Date(data.start);
    data.end.setDate(data.end.getDate() + t.days);
    data.end.setHours(end[0]);
    data.end.setMinutes(end[1]);

    data.tour = t;
    data.creator = u;
    data.status = 0;
    let d = await this.departureRepository.save(data);
    return d;
  }
  async getAllTour() {
    return this.tourRepository.getAll();
  }
  async getOneById(id: number) {
    const d = await this.departureRepository
      .createQueryBuilder('departure')
      .where('departure.id= :id', { id: id })
      .select('departure.id')
      .addSelect('departure.start')
      .addSelect('departure.end')
      .addSelect('departure.max')
      .leftJoinAndSelect('departure.tour', 'tour')
      // .addSelect('tour.id')
      //.leftJoinAndSelect('tour.fromDestintion', 'fromDestintion')
      //  .addSelect('fromDestintion.name')

      .addSelect('tour.image')
      .addSelect('tour.dresscode')
      .addSelect('tour.included')
      .addSelect('tour.notIncluded')
      .addSelect('tour.timeStart')
      .addSelect('tour.timeReturn')
      .leftJoin('tour.creator', 'creator')
      .addSelect('creator.id')
      .addSelect('creator.name')
      .leftJoin('tour.fromDestintion', 'fromDestintion')
      .addSelect('fromDestintion.name')
      .leftJoin('tour.destinations', 'destinations')
      .addSelect('destinations.name')
      .addSelect('destinations.id')
      .getOne();
    d['dateStart'] = new Date(d.start);

    d['dateStart'].setHours(d['dateStart'].getHours() + 7);
    d['dateStart'] = d['dateStart'].toJSON().slice(0, 10);

    d['dateEnd'] = new Date(d.end);
    d['dateEnd'].setHours(d['dateEnd'].getHours() + 7);
    d['dateEnd'] = d['dateEnd'].toJSON().slice(0, 10);
    for (var i = 0; i < d.tour.destinations.length; i++) {
      d.tour.destinations[i]['name1'] = d.tour.destinations[i].name
        .toLowerCase()
        .split(' ')
        .join('');
    }
    return d;
  }

  async getFlight(data) {
    const amadeus = new Amadeus({
      clientId: process.env.API_KEY,
      clientSecret: process.env.API_SECRET,
    });

    try {
      const flights = await amadeus.shopping.flightOffersSearch.get({
        originLocationCode: data.from,
        destinationLocationCode: data.to,
        departureDate: data.fromDate,
        adults: Number(data.people),
        children: 0,
        infants: 0,
        travelClass: data.travelClass,
        returnDate: data.toDate,
      });

      return flights.data.slice(0, 10);
    } catch (e) {
      console.log(e);
    }
  }
  async getAll(data: ListDepartureDto) {
    return this.departureRepository.getList(data);
  }
  async saveFlight(data) {
    let d = await this.departureRepository.getOne(data.id);
    d.flightDeparture = data.start;
    d.flightReturn = data.end;
    d.flightTimeDeparture = new Date(data.startTime);
    d.flightTimeReturn = new Date(data.returnTime);
    d.flightDurationDeparture = data.startDuration;
    d.flightDurationReturn = data.endDuration;
    d.status = 1;
    await d.save();
    return d;
  }
  async delete(id: number) {
    const d = await this.departureRepository
      .createQueryBuilder('departure')
      .select('departure')
      .getOne();
    let ticket = await this.ticketRepository.getTicketDeparture(id);
    for (var i = 0; i < ticket.length; i++) {
      ticket[i].status = 5;
      await ticket[i].save;
    }

    return await this.departureRepository.delete(d);
  }
  async edit(data) {
    let d = await this.departureRepository.getOne(data.id);
    d.status = data.status;
    await d.save();
    let t = await this.ticketRepository.getTicketDeparture(data.id);
    console.log(t);
    for (var i = 0; i < t.length; i++) {
      if (data.status == 2) t[i].status = 2;
      else if (data.status == 3) t[i].status = 3;
      await t[i].save();
    }
    return 'success';
  }
}
