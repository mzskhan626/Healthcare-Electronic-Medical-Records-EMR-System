import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class PatientCreateDto {
  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsString()
  @IsOptional()
  dateOfBirth?: string

  @IsString()
  @IsOptional()
  gender?: string

  @IsString()
  @IsOptional()
  contactInfo?: string

  @IsString()
  @IsOptional()
  address?: string

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

export class PatientUpdateDto {
  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsString()
  @IsOptional()
  dateOfBirth?: string

  @IsString()
  @IsOptional()
  gender?: string

  @IsString()
  @IsOptional()
  contactInfo?: string

  @IsString()
  @IsOptional()
  address?: string

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
