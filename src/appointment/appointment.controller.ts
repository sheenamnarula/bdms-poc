import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";

@Controller("appointment")
export class AppointmentController{
    constructor(private appointmentService: AppointmentService) {}
    @Post("create")
    createAppointment(@Body()payload:any){
     return this.appointmentService.createAppointment(payload);
    }
    
    @Get("get-appointments")
    getAppointments(){
     return this.appointmentService.getAppointments({doctorId:"6303a3d45109ffafb12a761f"})
    }

       
    @Get("get-appointments/:id")
    getAppointmentById(@Param('id') id:any){
     return this.appointmentService.getAppointmentById({appointmentId:id})
    }
}