import { Controller, Get, UseGuards,Param, InternalServerErrorException, Query} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SlotService } from './slots.service';


 @Controller('slots')
 export class SlotController {
  constructor(private slotService: SlotService) {}

  @Get('')
   @UseGuards(AuthGuard('jwt'))
  async getSlots(@Query() query) {
      try{
        let date = query.date;
        let doctorId = query.doctorId
        return await this.slotService.getSlots(date,doctorId);

      }catch(error){
          throw new InternalServerErrorException(error.message)
      }
  }
 }