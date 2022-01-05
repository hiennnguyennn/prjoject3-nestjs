import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin-review')
export class AdminReviewController {
  @Get('/reviews')
  @Render('admin/listReview')
  renderTours() {}
}
