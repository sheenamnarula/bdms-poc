import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import {constants} from "../utilities/constants";

export const slotSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId,auto:true },
  startTime : {
      type: String,
  },
  endTime : {
      type: String
  }
})

export const dateSchedule = new mongoose.Schema({
  date : {
      type: String
  },
  slots : [slotSchema]
})
export const DoctorSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId,auto:true },
    username:{ type: String, required: true },
    phone:{ type: String, required: true,unique:true },
    password: { type: String, required:true,select:false},
    gender:
    {type: String,
    enum: [
        constants.GENDER.MALE,
        constants.GENDER.FEMALE
    ]
},
specialization:{type:String,
enum:[constants.SPECIALIZATION.DENTIST,
    constants.SPECIALIZATION.ENT,
    constants.SPECIALIZATION.NEUROLOGIST,
    constants.SPECIALIZATION.PHYSICIAN,
    constants.SPECIALIZATION.SURGEON
]},
  created: { type: Date, default: Date.now },
});

DoctorSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
