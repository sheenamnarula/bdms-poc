 import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
 import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PatientLoginDTO, PatientRegisterDTO,DoctorLoginDTO,DoctorRegisterDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { DateSchedule, Doctor,Patient, Slot } from '../types/user';

 @Injectable()
 export class DoctorService {
    constructor(@InjectModel('Doctor') private doctorModel: Model<Doctor>,@InjectModel('DateSchedule') private dateScheduleModel: Model<DateSchedule>,@InjectModel('Slot') private slotModel: Model<Slot>) {}

async findDoctorsList() {
    return await this.doctorModel.find({})
  }

  async findDoctorByPayload(payload: any) {
    const { doctorId } = payload;
    return await this.doctorModel.findOne({ _id:doctorId });
  }
async createSlots(payload){
  let data=payload.slots;
  return await this.slotModel.insertMany([...data]);
}

async getSlots(){
    return await this.slotModel.find({}).select("startTime endTime");
}
  // async getSlots(payload:any){
  //   const {date,doctorId}=payload;
  //   const doctor = await this.doctorModel.findOne({ _id: doctorId}).populate("_id username dates");

	// 	// Doctor not found
	// 	if (doctor === null) {
	// 		console.log("Doctor not found in the database!");
  //     throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
	// 	}

	// 	// Doctor found
	// 	// Find the date
	// 	for (const i of doctor.dates) {
	// 		if (i.date === date) {
	// 			return i;
	// 		}
			
	// 	}
  //   throw new HttpException('No Slots found', HttpStatus.BAD_REQUEST);
		
  // }

  async createDate(date:any,id:any): Promise<Doctor> {
    let dateSchedule={date: date,
    slots: [
      new this.slotModel({
        time: "09:00:00",
        isBooked: false,
      }),
      new this.slotModel({
        time: "10:00:00",
        isBooked: false,
      }),
      new this.slotModel({
        time: "11:00:00",
        isBooked: false,
      }),
      new this.slotModel({
        time: "12:00:00",
        isBooked: false,
      }),
      new this.slotModel({
        time: "13:00:00",
        isBooked: false,
      }),
      new this.slotModel({
        time: "15:00:00",
        isBooked: false,
      }),
      new this.slotModel({
        time: "16:00:00",
        isBooked: false,
      }),
      new this.slotModel({
        time: "17:00:00",
        isBooked: false,
      }),
      new this.slotModel({
        time: "18:00:00",
        isBooked: false,
      }),
    ]
  }

  let dateCreated=new this.dateScheduleModel(dateSchedule);
  await dateCreated.save();
  const updatedDoctor = await this.doctorModel.findOneAndUpdate(
    { _id: id },
    { $push:{dates:dateCreated}},
    { new: true }
  );
  return updatedDoctor;
  }

  sanitizeUser(user: Doctor|Patient) {
    let sanitized = user.toObject();
   delete sanitized['password'];
    return sanitized;
    // return user.depopulate('password');
  }
 }
