import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';

import { PaginationService } from 'src/pagination/pagination.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PaginationService],
})
export class UsersModule {}
