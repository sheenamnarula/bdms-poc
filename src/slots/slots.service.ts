import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DateSchedule, Doctor,Patient, Slot } from '../types/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SlotService {

    constructor(@InjectModel('Slot') private slotModel: Model<Slot>){

    }
    async getSlots(){
            return await this.slotModel.find()
    }
 
}
