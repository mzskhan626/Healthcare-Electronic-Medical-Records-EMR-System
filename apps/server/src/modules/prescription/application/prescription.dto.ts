import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class PrescriptionCreateDto {
  @IsString()
  @IsOptional()
  medicationName?: string

  @IsString()
  @IsOptional()
  dosage?: string

  @IsString()
  @IsOptional()
  frequency?: string

  @IsString()
  @IsOptional()
  startDate?: string

  @IsString()
  @IsOptional()
  endDate?: string

  @IsString()
  @IsOptional()
  status?: string

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

export class PrescriptionUpdateDto {
  @IsString()
  @IsOptional()
  medicationName?: string

  @IsString()
  @IsOptional()
  dosage?: string

  @IsString()
  @IsOptional()
  frequency?: string

  @IsString()
  @IsOptional()
  startDate?: string

  @IsString()
  @IsOptional()
  endDate?: string

  @IsString()
  @IsOptional()
  status?: string

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
