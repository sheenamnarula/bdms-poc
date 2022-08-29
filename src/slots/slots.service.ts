import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Slot, Appointment } from '../types/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class SlotService {

    constructor(@InjectModel('Slot') private slotModel: Model<Slot>, @InjectModel('Appointment') private appointmentModel: Model<Appointment>) {

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
            if (appointment.length < 1) {
                finalSlots.push({ ...elem.toJSON() })
            }
        })
        await Promise.all(proms);
        return finalSlots;
    }

}
