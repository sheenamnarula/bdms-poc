import * as mongoose from 'mongoose';
import { slotSchema as Slot } from './doctor.schema';

export const prescription = new mongoose.Schema({
  given : {
      type : Boolean,
      default : false
  },
  title : {
      type : String,
      default : ""
  },
  details : {
      type : String,
      default : ""
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

export const appointmentSchema = new mongoose.Schema({
  doctorId : {
      required: true,
      type: String
  },
  date: {
      required: true,
      type: String
  },
  slotId : {
    type:mongoose.Schema.Types.ObjectId,
      ref:'Slot'
  },
  patientId : {
      required: true,
      type: String
  },
  doctorName : {
      type : String
  },
  doctorEmail : {
      type : String
  },
  patientName : {
      type : String
  },
  sendBirdLink : {
      type : String
  },
  prescription : prescription,
  created: {
    type: Date,
    default: Date.now,
  },
  name:{type: String, required: true},
  address:{type: String, required: true},
  dob:{type: String, required: true},
  symptoms : {type: String, required: true}
});
