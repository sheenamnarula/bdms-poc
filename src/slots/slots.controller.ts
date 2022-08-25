import { Controller, Get, UseGuards,Param, InternalServerErrorException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SlotService } from './slots.service';


 @Controller('slots')
 export class SlotController {
  constructor(private slotService: SlotService) {}

  @Get('')
  //  @UseGuards(AuthGuard('jwt'))
  async getSlots() {
      try{
        return await this.slotService.getSlots();

      }catch(error){
          throw new InternalServerErrorException(error.message)
      }
  }
 }