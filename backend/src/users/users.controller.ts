import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/user.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';
import {  FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: UsersDto) {
    return this.usersService.create(dto);
  }

  @Get('count')
  getCountUsers() {
    return this.usersService.getCountUsers();
  }

  @Get()
  getAll(@Query() queryDto: PaginationDto ) {
    return this.usersService.getAll(queryDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string){
    return this.usersService.byId(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async updateUser(@Param('id') id:string, @Body() dto: UsersDto){
    return this.usersService.update(+id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteUser(@Param('id') id: string){
    return this.usersService.delete(+id)
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, cb) {
          cb(null,`${file.originalname}`)
        },
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }


}


