import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationModule } from './modules/destination/destination.module';
import { TourModule } from './modules/tour/tour.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminDestinationModule } from './modules/admin-destination/admin-destination.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { configService } from './config/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminCategoryModule } from './modules/admin-category/admin-category.module';
import { AdminReviewModule } from './modules/admin-review/admin-review.module';
import { AdminDepartureModule } from './modules/admin-departure/admin-departure.module';

import { AdminTicketModule } from './modules/admin-ticket/admin-ticket.module';
import { AdminTourModule } from './modules/admin-tour/admin-tour.module';
import { AdminUserModule } from './modules/admin-users/admin-users.module';
import { Departure } from './modules/admin-departure/entities/departure.entity';
import { Tour } from './modules/tour/entities/tour.entity';
import { TourRepository } from './modules/tour/tour.repository';
import { DestinationRepository } from './modules/destination/destination.repository';
import { UserRepository } from './modules/user/user.repository';
import { CategoryRepository } from './modules/admin-category/category.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    TypeOrmModule.forFeature([
      TourRepository,
      DestinationRepository,
      UserRepository,
      CategoryRepository,
    ]),
    DestinationModule,
    TourModule,
    UserModule,
    AuthModule,
    AdminTourModule,
    AdminDestinationModule,
    AdminCategoryModule,
    AdminReviewModule,
    AdminDepartureModule,
    AdminUserModule,
    AdminTicketModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname,'..','public'),
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
