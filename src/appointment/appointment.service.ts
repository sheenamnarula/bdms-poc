import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, DateSchedule, Doctor, Patient, Slot, Availability } from '../types/user';
@Injectable()
export class AppointmentService {
	constructor(@InjectModel('Doctor') private doctorModel: Model<Doctor>, @InjectModel('Appointment') private appointmentModel: Model<Appointment>,
		@InjectModel('Slot') private slotModel: Model<Slot>, @InjectModel('Availability') private availability: Model<Availability>) { }



	async createAppointment(payload: any) {
		try {
			const patientId = payload.patientId; // Patient's id
			const patientName = payload.patientName; // Patient's name
			const doctorId = payload.doctorId; // Doctor's id 606460d2e0dd28cc76d9b0f3 
			const slotId = payload.slotId; // Id of that particular slot
			const date = payload.date;

			const isExist = await this.appointmentModel.findOne({ doctorId, slotId, date });
			if (isExist) throw new HttpException("Slot is not available", HttpStatus.CONFLICT);

			const isBlocked = await this.availability.findOne({ doctorId, slotId, date, blocked: true });
			if (isBlocked) throw new HttpException("Doctor is not available", HttpStatus.CONFLICT);

			const doctor = await this.doctorModel.findOne({ _id: doctorId });
			// Create an entry in the appointment database
			const newAppointment = new this.appointmentModel({
				doctorId,
				date,
				slotId,
				patientId,
				doctorName: doctor.username,
				patientName: patientName,
				name: payload.name,
				address: payload.address,
				dob: payload.dob,
				symptoms: payload.symptoms
			});


			return await newAppointment
				.save()
		} catch (error) {
			throw error
		}
	}

	async getAppointments(payload: any) {
		const doctorId = payload.doctorId;
		const appointments = await this.appointmentModel.find(payload).populate("slotId");
		const sortedAppointments = appointments.sort((a, b) => {
			return (
				Date.parse(b.date) -
				Date.parse(a.date)
			);
		});

		return sortedAppointments;
	}

	async getAppointmentById(payload: any) {
		const appointmentId = payload.appointmentId;
		const appointment = await this.appointmentModel.findOne({
			_id: appointmentId,
		}).populate("slotId");
		if (appointment) return appointment;
		throw new HttpException("No appointment found", HttpStatus.NO_CONTENT);
	}

	async todaysAppointment(payload: any) {
		const date = new Date()
		let currDate = ""
		const month = date.getMonth() + 1
		const day = date.getDate()

		currDate += day < 10 ? ('0' + day.toString()) : '' + day.toString()
		currDate += month < 10 ? ('-0' + month.toString()) : '-' + month.toString()
		currDate += '-' + date.getFullYear().toString()
		const query = payload.isDoctor ? { doctorId: payload._id.toString() } : { patientId: payload._id.toString() }
		const appointments = await this.appointmentModel.find({ ...query, date: currDate }).populate("slotId");

		const sortedAppointments = appointments.sort((a, b) => {
			return (
				Date.parse(a.date + "T") - Date.parse(b.date + "T")
			);
		});

		return sortedAppointments;
	}

	async previousAppointment(payload: any) {
		const query = payload.isDoctor ? { doctorId: payload._id } : { patientId: payload._id }

		const appointments = await this.appointmentModel.find(query);

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

	async addPrescriptionWithAppointment(payload: any) {
		const appointmentId = payload.appointmentId;
		const title = payload.title;
		const details = payload.prescription;

		await this.appointmentModel.findOne({ _id: appointmentId }).then((appointment) => {
			if (appointment) {
				// appointment.prescription.title = title;
				// appointment.prescription.details = details;
				// appointment.prescription.given = true;

				appointment.save().then(() => {
					return { message: `Prescription updated successfully!` };
				}).catch(err => {
					console.log(err);
					throw new HttpException("some thing went wrong prescription not updated", HttpStatus.EXPECTATION_FAILED)
				})
			}
		})
	}

	async saveRoomId(roomId, appointmentId) {
		await this.appointmentModel.updateOne({
			_id: appointmentId
		}, {
			$set: {
				sendBirdLink: roomId
			}
		})
	}

	async cancelAppointment({ appointmentId }) {
		return await this.appointmentModel.findByIdAndUpdate({
			_id: appointmentId
		},
			{
				$set: {
					isActive: false
				}
			})
	}

	async rescheduleAppointment({ appointmentId, date, slotId }) {
		let appointmentDetails = await this.appointmentModel.findOne({_id : appointmentId, isActive: true})
		if(!appointmentDetails){
			throw new BadRequestException("Unable to find active appointment")
		}
		const isExist = await this.appointmentModel.findOne({ doctorId: appointmentDetails.doctorId, slotId, date, isActive:true });
		if (isExist) throw new HttpException("Slot is not available", HttpStatus.CONFLICT);

		const isBlocked = await this.availability.findOne({ doctorId: appointmentDetails.doctorId, slotId, date, blocked: true });
		if (isBlocked) throw new HttpException("Doctor is not available", HttpStatus.CONFLICT);
		return await this.appointmentModel.findByIdAndUpdate({
			_id: appointmentId
		},
			{
				$set: {
					date,
					slotId
				}
			},{new:true})
	}

}