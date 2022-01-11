import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { CreateDateColumn } from 'typeorm';
import { CategoryRepository } from '../admin-category/category.repository';
import { DestinationRepository } from '../destination/destination.repository';
import { PlanRepository } from '../tour/plan.repository';
import { TourRepository } from '../tour/tour.repository';
import { UserRepository } from '../user/user.repository';
import { CreateTourDto } from './dto/create.dto';
import { EditTourDto } from './dto/edit.dto';
import { ListTourDto } from './dto/list.dto';

@Injectable()
export class AdminTourService {
  constructor(
    private readonly tourRepository: TourRepository,
    private readonly userRepository: UserRepository,
    private readonly destinationRepository: DestinationRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly planRepository: PlanRepository,
  ) {}
  private fs = require('fs');
  async getListDestination() {
    return this.destinationRepository.getAllName();
  }
  async getList(data: ListTourDto) {
    return this.tourRepository.getListTour(data);
  }
  async createTour(user, data: CreateTourDto, image) {
    try {
      const tmp = await this.tourRepository.getTourByname(data.name);
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
          path = `./public/file/tours/${item}`;
          this.fs.unlinkSync(path);
        });
        throw new BadRequestException('NAME EXIST');
      } else {
        let des = [];

        let desArr = data.des;
        for (var i = 0; i < desArr.length; i++) {
          let t = await this.destinationRepository.getDestinationbyId(
            Number(desArr[i]),
          );
          des.push(t);
        }
        data['fromDestintion'] =
          await this.destinationRepository.getDestinationbyId(
            Number(data.from),
          );

        let category = [];
        let tmp = data.category.split(',');

        for (var i = 0; i < tmp.length; i++) {
          let c = await this.categoryRepository.getOne(Number(tmp[i]));
          category.push(c);
        }

        data['isHot'] = 0;
        data['categories'] = category;
        data['destinations'] = des;
        data['status'] = 1;
        data['creator'] = await this.userRepository.findUserByEmailAndRole(
          user.mail,
          [2],
        );

        data.image = f;

        let t = await this.tourRepository.save(data);

        var plan = [];
        for (var i = 0; i < data.plan_titles.length; i++) {
          plan[i] = {
            title: data.plan_titles[i],
            included: data.plan_includes[i],
            notIncluded: data.plan_notIncludes[i],
            description: data.plan_descriptions[i],
            tour: t,
          };

          await this.planRepository.save(plan[i]);
        }
        return t;
      }
    } catch (e) {
      console.log(e);
    }
    // try {
    //   await this.tourRepository.save(data);
    // } catch (e) {
    //   return e;
    // }
  }
  async tourDetail(id: number) {
    let tours = await this.tourRepository.getTourById(id);

    let tmp = {};
    for (var i = 0; i < tours.included.length; i++) {
      tmp['included'] = tours.included.split(';');
    }
    for (var i = 0; i < tours.notIncluded.length; i++) {
      tmp['notIncluded'] = tours.notIncluded.split(';');
    }
    tmp = Object.assign(tours, tmp);
    return tmp;
  }
  async getTour(id: number) {
    return this.tourRepository.getTourById(id);
  }
  async deleteTour(id: number) {
    const t = await this.tourRepository
      .createQueryBuilder('tour')
      .select('tour')
      .leftJoinAndSelect('tour.creator', 'creator')
      .leftJoinAndSelect('tour.destinations', 'destinations')
      .where('tour.id= :id', { id: id })
      .getOne();

    if (!t) throw new BadRequestException('NOT FOUND');
    else {
      await this.tourRepository.delete(t.id);
      return 'deleted';
    }
  }
  async editTour(user, data: EditTourDto, image, id) {
    try {
      let tour = await this.tourRepository.getTourById(id);

      image = Object(image).image;
      let f: string[] = [];
      if (image) {
        await image.forEach((item, index) => {
          f.push(item.filename);
        });
      }

      if (data.name !== tour.name) {
        const tmp = await this.tourRepository.getTourByname(data.name);
        if (tmp) {
          await f.forEach((item, index) => {
            let path: string;
            path = `./public/file/tours/${item}`;
            this.fs.unlinkSync(path);
          });
          throw new BadRequestException('NAME EXIST');
        }
      }

      let images;
      if (data.oldImage.length > 0) images = data.oldImage.split(',');
      else images = [];

      for (var i = 0; i < tour.image.length; i++) {
        let tmp = images.indexOf(tour.image[i]);
        if (tmp === -1) {
          let path: string;
          path = `./public/file/tours/${tour.image[i]}`;
          this.fs.unlinkSync(path);
        }
      }
      let des = [];
      let desId = [];

      for (var i = 0; i < data.des.length; i++) {
        desId.push(data.des[i]);
      }

      // for (var i = 0; i < desId.length; i++) {
      //   let t = await this.tourRepository
      //     .createQueryBuilder('tour_destinations_destination')
      //     .select('tour_destinations_destination')
      //     .where('tour_destinations_destination.tourId= :tourId', {
      //       tourId: id,
      //     })
      //     .andWhere('tour_destinations_destination.destinationId= :id', {
      //       id: desId[i],
      //     })
      //     .getOne();
      //   await this.tourRepository.delete(t.id);
      // }
      for (var i = 0; i < data.des.length; i++) {
        let t = await this.destinationRepository.getDestinationbyId(
          Number(data.des[i]),
        );

        des.push(t);
      }
      data['destinations'] = des;

      images = images.concat(f);

      data.image = images;

      tour = Object.assign(tour, data);

      await tour.save();
      return tour;
    } catch (e) {
      console.log(e);
    }
  }
  async editHotTour(id: number) {
    let t = await this.tourRepository.getTourById(id);
    if (t) {
      t.isHot = 1 - t.isHot;
      return await t.save();
    } else throw new BadRequestException('NOT FOUND');
  }
}
