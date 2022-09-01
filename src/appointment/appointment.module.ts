import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { appointmentSchema } from 'src/models/appointment.schema';
import { dateSchedule, DoctorSchema, slotSchema } from 'src/models/doctor.schema';
import { SlotController } from 'src/slots/slots.controller';
import { SlotService } from 'src/slots/slots.service';
//import { AppointmentSchema } from '../models/appointment.schema';
import { SharedModule } from '../shared/shared.module';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
    MongooseModule.forFeature([{name:"Appointment",schema:appointmentSchema}]),
    MongooseModule.forFeature([{ name: 'Slot', schema: slotSchema }]),
    SharedModule,DoctorModule
  ],
  controllers: [AppointmentController,SlotController],

  
providers: [AppointmentService,SlotService],
})
export class AppointmentModule {}
