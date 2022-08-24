import { Document } from 'mongoose';


export interface Doctor extends Document {
  _id:string;
  username: string;
  password: string;
  phone: string;
  gender:string;
  specialization:string;
  created: Date;
}

export interface Slot extends Document {
  _id:string;
  startTime:string;
  endTime:string;
}

export interface DateSchedule extends Document {
  date:string;
  slots:Slot[];
}

export interface Appointment extends Document {
  doctorId:string;
  date:string;
  slotId:string;
  patientId:string;
  doctorName:string;
  doctorEmail:string;
  patientname:string;
  sendBirdLink:string;
  prescription:string;
  created:Date;
}

export interface Patient extends Document {
  _id:string;
  username: string;
  password: string;
  phone: string;
  gender:string;
  created: Date;
}
