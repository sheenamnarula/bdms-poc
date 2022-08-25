import { Controller, Get, UseGuards, Post, Body, Param, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PatientService } from './patient.service';
import { UserService } from 'src/shared/user.service';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService, private userService: UserService) { }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findDoctorById(@Param('id') id: string) {
    try {
      return this.patientService.findPatientByPayload(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
