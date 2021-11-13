import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationModule } from './modules/destination/destination.module';
import { TourModule } from './modules/tour/tour.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [DestinationModule, TourModule, UserModule, AuthModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname,'..','public'),
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
