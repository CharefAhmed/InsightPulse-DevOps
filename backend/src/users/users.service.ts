import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor( private readonly databaseService:DatabaseService){}
  
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password,9);
    return this.databaseService.user.create({
      data:{
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      }
    });
  }

  async findAll() {
    return this.databaseService.user.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      }
    });
  }
  async findOneByEmail(email: string){
    return this.databaseService.user.findUnique({
      where: {
        email,
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
      
    });
  }

  async delete(id: number) {
    return this.databaseService.user.delete({
      where:{
        id,
      }
    });
  }
}
