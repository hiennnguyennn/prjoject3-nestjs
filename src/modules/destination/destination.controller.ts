import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { DestinationService } from './destination.service';

@Controller('destinations')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}
  @Get()
  async listDestinations(@Res() res) {
    const des = await this.destinationService.getAll();
    console.log(des);
    res.render('user/destination/listCountry', { des });
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'an integer for the destination id',
    schema: { type: 'integer' },
  })
  async DestinationDetail(@Param('id', ParseIntPipe) id, @Res() res) {
    const des = await this.destinationService.getDestinationById(id);
    console.log(des);
    res.render('user/destination/showCountry', { des });
  }
}
