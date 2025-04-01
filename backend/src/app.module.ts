import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaginationModule } from './pagination/pagination.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UsersModule, PaginationModule, 

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  
})
export class AppModule {}
