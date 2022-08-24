import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { AppointmentService } from "./appointment.service";

@Controller("appointment")
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) { }
    @Post("create")
    @UseGuards(JwtAuthGuard)
    createAppointment(@Body() payload: any) {
        return this.appointmentService.createAppointment(payload);
    }

    @Get("get-appointments")
    @UseGuards(JwtAuthGuard)
    getAppointments(@Request() req) {
        console.log(req.user)
        if (req.user['isDoctor']) {
            return this.appointmentService.getAppointments({ doctorId: req.user._id.toString() })

        } else {
            console.log(req.user._id.toString())
            return this.appointmentService.getAppointments({ patientId: req.user._id.toString() })
        }
    }


    @Get("get-appointments/:id")
    @UseGuards(JwtAuthGuard)
    getAppointmentById(@Param('id') id: any) {
        return this.appointmentService.getAppointmentById({ appointmentId: id })
    }

    @Get("today-appointments")
    @UseGuards(JwtAuthGuard)
    getTodaysAppointments(@Request() req) {
        return this.appointmentService.todaysAppointment(req.user)
    }

    @Get("previous-appointments")
    @UseGuards(JwtAuthGuard)
    getPreviousAppointments(@Request() req) {
        return this.appointmentService.previousAppointment(req.user)
    }
}