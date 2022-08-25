import { Body, Controller, Get, InternalServerErrorException, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { AppointmentService } from "./appointment.service";

@Controller("appointment")
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) { }
    @Post("create")
    @UseGuards(JwtAuthGuard)
    createAppointment(@Body() payload: any) {
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
            if (req.user['isDoctor']) {
                return this.appointmentService.getAppointments({ doctorId: req.user._id.toString() })

            } else {
                console.log(req.user._id.toString())
                return this.appointmentService.getAppointments({ patientId: req.user._id.toString() })
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
}