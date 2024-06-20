import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class AppointmentCreateDto {
  @IsString()
  @IsOptional()
  dateTime?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  patientId?: string

  @IsString()
  @IsOptional()
  providerId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class AppointmentUpdateDto {
  @IsString()
  @IsOptional()
  dateTime?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  patientId?: string

  @IsString()
  @IsOptional()
  providerId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
