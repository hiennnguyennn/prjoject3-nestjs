import { BadRequestException, Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { DestinationRepository } from '../destination/destination.repository';
import { TourRepository } from '../tour/tour.repository';
import { UserRepository } from '../user/user.repository';
import { CreateDestinationDto } from './dto/create.dto';
import { EditDestinationDto } from './dto/edit.dto';
import { ListDestinationDto } from './dto/list.dto';

@Injectable()
export class AdminDestinationService {
  constructor(
    private readonly destinationRepository: DestinationRepository,
    private readonly userRepository: UserRepository,
    private readonly tourRepository: TourRepository,
  ) {}
  private fs = require('fs');
  async createDestination(user, data: CreateDestinationDto, image) {
    const tmp = await this.destinationRepository.findDestinationByName(
      data.name,
    );
    image = Object(image).image;
    let f: string[] = [];
    if (image) {
      await image.forEach((item, index) => {
        f.push(item.filename);
      });
    }

    if (tmp) {
      await f.forEach((item, index) => {
        let path: string;
        path = `./public/file/destinations/${item}`;
        this.fs.unlinkSync(path);
      });
      throw new BadRequestException('NAME EXIST');
    } else {
      data['creator'] = await this.userRepository.findUserByEmailAndRole(
        user.mail,
        [2],
      );
      data.image = f;
      return await this.destinationRepository.save(data);
    }
  }

  async editDestination(user, data: EditDestinationDto, image, id: number) {
    let des = await this.destinationRepository.getDestinationbyId(id);

    let images = data.oldImage.split(',');

    image = Object(image).image;
    let f: string[] = [];
    if (image) {
      await image.forEach((item, index) => {
        f.push(item.filename);
      });
    }
    if (data.name !== des.name) {
      const tmp = await this.destinationRepository.findDestinationByName(
        data.name,
      );
      if (tmp) {
        await f.forEach((item, index) => {
          let path: string;
          path = `./public/file/destinations/${item}`;
          this.fs.unlinkSync(path);
        });
        throw new BadRequestException('NAME EXIST');
      }
    }
    for (var i = 0; i < des.image.length; i++) {
      let tmp = images.indexOf(des.image[i]);
      if (tmp === -1) {
        let path: string;
        path = `./public/file/destinations/${des.image[i]}`;
        this.fs.unlinkSync(path);
      }
    }
    images = images.concat(f);
    data.image = images;
    des = Object.assign(des, data);
    await des.save();
    return des;
  }
  async getDestinationDetail(id: number) {
    return this.destinationRepository.getDestinationbyId(id);
  }
  async getListDestinations(data: ListDestinationDto) {
    return this.destinationRepository.getAll(data);
  }
  async deleteDestination(id: number) {
    const d = await this.destinationRepository
      .createQueryBuilder('destination')
      .select('destination')
      .leftJoinAndSelect('destination.creator', 'creator')
      .leftJoinAndSelect('destination.tours', 'tours')
      .where('destination.id= :id', { id: id })
      // .groupBy('destination.id')
      .getOne();
    console.log(d);

    if (!d) throw new BadRequestException('NOT FOUND');
    else {
      for (var i = 0; i < d.tours.length; i++) {
        let t = await this.tourRepository.getTourById(d.tours[i].id);
        await this.tourRepository.delete(t.id);
      }
      await this.destinationRepository.remove(d);
      return 'deleted';
    }
  }
}
