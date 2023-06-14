import {
  Controller,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { send } from 'process';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { Customer } from 'src/customers/type/Customer';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get(':id')
  getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      res.status(200).send(customer);
    } else {
      res.status(400).send({ msg: 'Customer not found!' });
    }
  }

  @Get('/search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number): void | Customer {
    const customer = this.customersService.findCustomerById(id);
    if (customer) {
      return customer;
    } else {
      throw new HttpException('Customer not found!', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('')
  getAllUsers(): Customer[] {
    return this.customersService.getCustomers();
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto): void {
    this.customersService.createCustomer(createCustomerDto);
  }
}
