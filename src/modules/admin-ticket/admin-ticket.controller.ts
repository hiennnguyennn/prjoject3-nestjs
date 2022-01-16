import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorator/auth.decorator';
import { AdminTicketService } from './admin-ticket.service';
import { ChangeTicketDto } from './dto/change.dto';
import { ListTicketDto } from './dto/list.dto';
@ApiTags('admin-ticket')
@Controller('admin-ticket')
export class AdminTicketController {
  constructor(private readonly adminTicketService: AdminTicketService) {}
  @Auth('staff')
  @Get('/tickets')
  // @Render('admin/listTicket')
  async renderTickets(@Query() data: ListTicketDto, @Res() res) {
    data.page = data.page > 0 ? data.page : 1;
    data.limit = data.limit > 0 ? data.limit : 10;
    data.sort = data.sort ? data.sort : 'desc';
    let result = await this.adminTicketService.getList(data);
    console.log(111, result);
    res.render('admin/listTicket', { result: result });
  }
  @Auth('staff')
  @Post('/tickets/editStatus')
  async changeStatus(@Body() data: ChangeTicketDto, @Res() res) {
    console.log(222, data);
    let t = await this.adminTicketService.changeStatus(data);
    res.redirect('back');
  }
}
