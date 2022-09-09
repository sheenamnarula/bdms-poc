import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { AppointmentDto } from "./appointment.dto";
import { AppointmentService } from "./appointment.service";

@Controller("appointment")
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) { }
    @Post("create")
    @UseGuards(JwtAuthGuard)
    createAppointment(@Body() payload: AppointmentDto) {
        try {
            return this.appointmentService.createAppointment(payload);
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get("get-appointments")
    @UseGuards(JwtAuthGuard)
    getAppointments(@Request() req) {
        try {
            let query = {}
            if (req.query["date"]) {
                query = { date: req.query["date"] }
            }
            if (req.user['isDoctor']) {
                return this.appointmentService.getAppointments({ ...query, doctorId: req.user._id.toString() })

            } else {
                console.log(req.user._id.toString())
                return this.appointmentService.getAppointments({ ...query, patientId: req.user._id.toString() })
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }


    @Get("get-appointments/:id")
    @UseGuards(JwtAuthGuard)
    getAppointmentById(@Param('id') id: any) {
        try {
            return this.appointmentService.getAppointmentById({ appointmentId: id })

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get("today-appointments")
    @UseGuards(JwtAuthGuard)
    getTodaysAppointments(@Request() req) {
        try {
            return this.appointmentService.todaysAppointment(req.user)

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Get("previous-appointments")
    @UseGuards(JwtAuthGuard)
    getPreviousAppointments(@Request() req) {
        try {
            return this.appointmentService.previousAppointment(req.user)

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    @Post("roomId")
    @UseGuards(JwtAuthGuard)

    async saveRoomId(@Body() { roomId, appointmentId }) {
        try {
            await this.appointmentService.saveRoomId(roomId, appointmentId)
            return { message: "Room ID is saved successfully" };
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

    @Delete("/cancel")
    @UseGuards(JwtAuthGuard)

    async cancelAppointment(@Body() payload) {
        try {
            await this.appointmentService.cancelAppointment(payload)
            return { message: "Appointment is cancelled successfully." }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

    @Patch("/reschedule")
    @UseGuards(JwtAuthGuard)

    async rescheduleAppointment(@Body() payload) {
        try {
            let { modifiedCount } = await this.appointmentService.rescheduleAppointment(payload);
            if (modifiedCount) {
                return { message: "Appointment is rescheduled sucessfully." }
            } else {
                throw new Error("Failure in rescheduling the appointment")
                // return { message: "Failure in rescheduling appointment." }
            }
        } catch (error) {
            console.log(error)
            if(error.status == 400){
                throw new BadRequestException(error.message)
            }
            throw new InternalServerErrorException(error.message)
        }

    }
}