 import { Controller, Get, UseGuards, Post, Body ,Param, InternalServerErrorException} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UserService } from 'src/shared/user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

 @Controller('doctor')
 export class DoctorController {
  constructor(private doctorService: DoctorService,private userService:UserService) {}

  @Get('list')
  @UseGuards(JwtAuthGuard)
  listDoctor() {
    try{
      return this.doctorService.findDoctorsList();

    }catch(error){
      throw new InternalServerErrorException(error.message)
    }
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  createOrder(@Param('id') id: string) {
    try{
      return this.doctorService.findDoctorByPayload({doctorId:id});

    }catch(error){
      throw new InternalServerErrorException(error.message)
    }
  }
  
  @Get("slots")
  @UseGuards(JwtAuthGuard)
  getDoctorSlots(){
    try{
      return this.doctorService.getSlots();

    }catch(error){
      throw new InternalServerErrorException(error.message)
    }
  }


 }
