import {
  IsEmail,
  IsNumberString,
  IsNotEmptyObject,
  ValidateNested,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddressDto';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address?: CreateAddressDto;
}
