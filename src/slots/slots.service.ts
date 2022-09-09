import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Slot, Appointment, Availability } from '../types/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class SlotService {

    constructor(@InjectModel('Availability') private availability: Model<Slot>, @InjectModel('Slot') private slotModel: Model<Slot>, @InjectModel('Appointment') private appointmentModel: Model<Appointment>) {

    }
    async getSlots(date, doctorId) {
        //check for particular date which slots are booked
        let allSlots = await this.slotModel.find()
        let finalSlots = []
        let proms = allSlots.map(async (elem) => {
            console.log(elem._id)
            let appointment = await this.appointmentModel.find({
                slotId: elem._id,
                doctorId: doctorId, date: date
            })
            let checkBlockedSlot = await this.availability.find({
                slotId: elem._id,
                doctorId: doctorId, date: date,
                blocked:true
            })
            if (appointment.length < 1 && checkBlockedSlot.length < 1) {
                finalSlots.push({ ...elem.toJSON() })
            }
        })
        await Promise.all(proms);
        return finalSlots;
    }

    async blockslot({ date, slotId },userId) {
        let availabilityDoc = new this.availability({
            doctorId: userId,
            date,
            slotId,
            blocked: true
        });
        let res = await availabilityDoc.save()
        if (res) {
            return true;
        } else {
            return false
        }
    }

    async releaseSlot({ 
        blockedSlotId }) {
       return await this.availability.findByIdAndUpdate({
           _id : blockedSlotId

        }, {
            $set: {
                blocked: false
            }
        });
    }

    async getBlockedSlots({date},userId){
        return await this.availability.find({
            doctorId : userId,
            blocked : true,
            date
        }).populate("slotId")
    }

}
