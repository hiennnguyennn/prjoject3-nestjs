import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

export function Auth(role: string) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    SetMetadata('roles', role),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
