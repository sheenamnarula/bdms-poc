import { IsString, IsNotEmpty } from 'class-validator';

export class PatientLoginDTO {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class PatientRegisterDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone:string

  @IsString()
  @IsNotEmpty()
  gender:string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  address:string

  @IsString()
  @IsNotEmpty()
  dob:string
}

export class DoctorLoginDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class DoctorRegisterDTO {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  phone:string;
  @IsString()
  @IsNotEmpty()
  gender:string;
  @IsString()
  @IsNotEmpty()
  specialization:string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address:string;

  @IsString()
  @IsNotEmpty()
  dob:string
}