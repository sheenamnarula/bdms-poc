import { Controller, Get, UseGuards, Param, InternalServerErrorException,Request, Query, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SlotService } from './slots.service';


@Controller('slots')
export class SlotController {
  constructor(private slotService: SlotService) { }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getSlots(@Query() query) {
    try {
      let date = query.date;
      let doctorId = query.doctorId
      return await this.slotService.getSlots(date, doctorId);

    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  @Post('/block')
  @UseGuards(AuthGuard('jwt'))
  async blockSlot(@Body() payload: any, @Request() req : any) {
    try {
      let res = await this.slotService.blockslot(payload,req.user._id)
      if (res) {
        return { message: "Slot is blocked successfully." }

      } else {
        return { message: "Failed in blocking slot." }

      }

    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }

  @Post('/release')
  @UseGuards(AuthGuard('jwt'))
  async releaseSlot(@Body() payload: any) {
    try {
      // check for res
      let res = await this.slotService.releaseSlot(payload)
      if (res) {
        return { message: "Slot is released successfully." }

      } else {
        return { message: "Failed in releasing slot." }
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }

  @Get('/block')
  @UseGuards(AuthGuard('jwt'))
  async getBlockedSlots(@Body() payload: any, @Request() req : any) {
    try {
      // check for res
      return await this.slotService.getBlockedSlots(payload, req.user._id)
     
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }
}