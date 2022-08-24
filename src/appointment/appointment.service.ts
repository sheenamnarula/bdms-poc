import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, DateSchedule, Doctor,Patient, Slot } from '../types/user';
@Injectable()
 export class AppointmentService {
    constructor(@InjectModel('Doctor') private doctorModel: Model<Doctor>,@InjectModel('Appointment') private appointmentModel: Model<Appointment>,@InjectModel('Slot') private slotModel: Model<Slot>) {}



    async createAppointment(payload:any)
    {
    const patientId = payload.patientId; // Patient's id
	const patientName = payload.patientName; // Patient's name
	const doctorId = payload.doctorId; // Doctor's id 606460d2e0dd28cc76d9b0f3 
	const slotId = payload.slotId; // Id of that particular slot
	const date = payload.date; 

	const isExist=await this.appointmentModel.findOne({doctorId,slotId,date});
	if(isExist) throw new HttpException("Slot is not available",HttpStatus.CONFLICT);

	const doctor=await this.doctorModel.findOne({ _id: doctorId });
				// Create an entry in the appointment database
	const newAppointment = new this.appointmentModel({
					doctorId,
					date,
					slotId,
					patientId,
					doctorName: doctor.username,
					patientName: patientName
				});

				console.log(newAppointment);

				newAppointment
					.save()
					.then((appointment) => {
						return appointment;
					})
	
}

async getAppointments(payload:any){
    const doctorId = payload.doctorId;
		const appointments = await this.appointmentModel.find({
			doctorId: doctorId,
		});
		const sortedAppointments = appointments.sort((a, b) => {
			return (
				Date.parse(b.date) -
				Date.parse(a.date)
			);
		});

		return sortedAppointments;
}

async getAppointmentById(payload:any){
    const appointmentId = payload.appointmentId;
		const appointment = await this.appointmentModel.findOne({
			_id: appointmentId,
		});
    if(appointment)return appointment;
	throw new HttpException("No appointment found",HttpStatus.NO_CONTENT);
}

async todaysAppointment(payload:any){
    const date = new Date()
		let currDate = date.getFullYear().toString()
		const month = date.getMonth() + 1
		const day = date.getDate()

		currDate += month < 10 ? ('-0' + month.toString()) : '-' + month.toString()
		currDate += day < 10 ? ('-0' + day.toString()) : '-' + day.toString()

		const doctorId = payload.doctorId;

		const appointments = await this.appointmentModel.find({ doctorId: doctorId, date: currDate });

		const sortedAppointments = appointments.sort((a, b) => {
			return (
				Date.parse(a.date + "T") - Date.parse(b.date + "T")
			);
		});

		return sortedAppointments;
}

async previousAppointment(payload:any){
    const doctorId = payload.doctorId;

		const appointments = await this.appointmentModel.find({ doctorId: doctorId });

		// Get current dateTime
		const date = new Date()
		let currDateTime = date.getFullYear().toString()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hour = date.getHours()
		const minutes = date.getMinutes()
		const seconds = date.getSeconds()

		currDateTime += month < 10 ? ('-0' + month.toString()) : '-' + month.toString()
		currDateTime += day < 10 ? ('-0' + day.toString()) : '-' + day.toString()
		currDateTime += hour < 10 ? ('T0' + hour.toString()) : 'T' + hour.toString()
		currDateTime += minutes < 10 ? (':0' + minutes.toString()) : ':' + minutes.toString()
		currDateTime += seconds < 10 ? (':0' + seconds.toString()) : ':' + seconds.toString()

		const filteredAppointments = appointments.filter((appointment) => {
			return Date.parse(currDateTime) >= Date.parse(appointment.date + 'T')
		})

		const sortedAppointments = filteredAppointments.sort((a, b) => {
			return Date.parse(b.date + 'T') - Date.parse(a.date + 'T')
		})

		return sortedAppointments;
}

async addPrescriptionWithAppointment(payload:any){
	const appointmentId = payload.appointmentId;
    const title = payload.title;
    const details = payload.prescription;

    await this.appointmentModel.findOne({ _id : appointmentId }).then((appointment) => {
        if(appointment) {
            // appointment.prescription.title = title;
            // appointment.prescription.details = details;
            // appointment.prescription.given = true;

            appointment.save().then(() => {
                return {message : `Prescription updated successfully!`};
            }).catch(err => {
                console.log(err);
                throw new HttpException("some thing went wrong prescription not updated",HttpStatus.EXPECTATION_FAILED)
            })
        }
    })
}

 }