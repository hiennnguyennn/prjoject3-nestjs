import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin-ticket')
export class AdminTicketController {
  @Get('/tickets')
  @Render('admin/listTicket')
  renderTours() {}
}
