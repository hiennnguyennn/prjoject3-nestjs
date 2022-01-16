import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminReviewService } from './admin-review.service';
import { ListReviewDto } from './dto/list.dto';
@ApiTags('admin-review')
@Controller('admin-review')
export class AdminReviewController {
  constructor(private readonly adminReviewService: AdminReviewService) {}
  @Get('/reviews')
  // @Render('admin/listReview')
  async renderTours(@Query() data: ListReviewDto, @Res() res) {
    let reviews = await this.adminReviewService.getList(data);
    console.log(reviews);

    res.render('admin/listReview', { reviews: reviews });
  }
}
