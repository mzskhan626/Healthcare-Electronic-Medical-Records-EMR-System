import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class MedicalHistoryCreateDto {
  @IsString()
  @IsOptional()
  diagnosis?: string

  @IsString()
  @IsOptional()
  treatment?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  patientId?: string

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

export class MedicalHistoryUpdateDto {
  @IsString()
  @IsOptional()
  diagnosis?: string

  @IsString()
  @IsOptional()
  treatment?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsString()
  @IsOptional()
  patientId?: string

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
