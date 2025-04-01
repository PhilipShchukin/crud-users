import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersDto } from './dto/user.dto';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class UsersService {

  constructor(
    private prisma:PrismaService,
    private PaginationService: PaginationService,
  ){}

  async create(dto: UsersDto){
    return this.prisma.user.create({
      data: dto
    })
  }

  async getCountUsers() {
    return this.prisma.user.count()
  }

  async getAll(dto: PaginationDto = {}) {
    const { perPage, skip} = this.PaginationService.getPagination(dto)

    const products = await this.prisma.user.findMany({
      skip,
      take:perPage,
  })
  return products
  }

  async byId(id:number){
    const user = await this.prisma.user.findUnique({
        where:{
            id
        }
    })

    if(!user) throw new NotFoundException('User not found')
    return user
}

  async update(id: number, dto: UsersDto){
    const {name,surname,height,weight,gender,placeOfResidence,avatarPath} = dto

    return this.prisma.user.update({
        where:{
            id
        },
        data:{
          name,surname,height,weight,gender,placeOfResidence,avatarPath
        }
    })
}

  async delete(id:number){
    return this.prisma.user.delete({
        where:{
            id
        }
    })
}

}
