import { IsString, IsNotEmpty,IsOptional } from 'class-validator';

export class AppointmentDto {

    @IsString()
    @IsNotEmpty()
    doctorId: string;

    @IsString()
    date: string;

    @IsString()
    slotId: string;

    @IsString()
    patientId: string;

    @IsString()
    @IsOptional()
    doctorName ?: string;

    @IsString()
    @IsOptional()
    doctorEmail ?: string;

    @IsString()
    @IsOptional()
    patientName: string;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    dob: string;

    @IsString()
    symptoms: string;
}