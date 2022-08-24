import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://admin:Admin%40123@teleconsultation.irbwr.mongodb.net/BDMS?retryWrites=true&w=majority", {

      useNewUrlParser: true,

    }),
    // MongooseModule.forRoot("mongodb://localhost:27017/bdms"),
    SharedModule,
    AuthModule,
    DoctorModule,
    AppointmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
