import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Amadeus from 'amadeus';
import { isRFC3339 } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  const config = new DocumentBuilder()
    .setTitle('Explora')
    .setDescription('The explora description')
    .setVersion('1.0')
    .addTag('explora')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'access-token',
    )
    .addCookieAuth('authCookie', {
      type: 'http',
      in: 'Header',
      scheme: 'Brearer',
    })
    .build();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerHelper('sum', function (a, b) {
    return a + b;
  });
  hbs.registerHelper('changeStatus', function (a, b) {
    let tmp = a - b;

    if (tmp === 0) return 'DISABLE';
    else if (tmp === 1) return 'ACTIVE';
  });
  hbs.registerHelper('date', function (a) {
    a = a.toString();
    let tmp = a.split(' ').slice(0, 5);
    return tmp.join(' ');
  });
  hbs.registerHelper('display', function (a) {
    if (a === 0) return 'Hide';
    else return 'Display';
  });
  hbs.registerHelper('select', function (selected, option) {
    if (selected == option) return `checked`;
    else return '';
  });
  hbs.registerHelper('isHot', function (a) {
    if (a === 0) return 'Add hot tour';
    else if (a === 1) return 'Remove hot tour';
  });
  hbs.registerHelper('hotnew', function (a) {
    if (a === 0) return 'New';
    else if (a === 1) return 'Hot';
  });
  hbs.registerHelper('role', function (a) {
    if (a === 0) return 'User normal';
    else if (a === 1) return 'Employee';
    else if (a === 2) return 'Manager';
  });
  hbs.registerHelper('status', function (a) {
    if (a === 0) return 'Disabled';
    else if (a === 1) return 'Active';
  });
  hbs.registerHelper('statusDeparture', function (a) {
    if (a === 0) return 'Disabled';
    else if (a === 1) return 'Pending';
    else if (a === 2) return 'On going';
    else if (a === 3) return 'Done';
  });
  hbs.registerHelper('dropdown', function (a, b) {
    if (a) {
      if (b == 'month') {
        const today = new Date();
        today.setMonth(a - 1);
        return today.toLocaleString('default', { month: 'long' });
      }
      return a;
    } else {
      if (b === 'month') return 'Month';
      else return 'Where to?';
    }
  });
  app.set('view options', { layout: '../views/layouts/main' });
  app.setViewEngine('hbs');

  const amadeus = await new Amadeus({
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET,
  });
  await app.listen(configService.get('PORT'));
}
bootstrap();
