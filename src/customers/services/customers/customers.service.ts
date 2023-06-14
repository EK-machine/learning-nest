import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/type/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'danny@mail.com',
      name: 'Danny Danny',
    },
    {
      id: 2,
      email: 'adam@mail.com',
      name: 'Adam Adam',
    },
    {
      id: 3,
      email: 'spencer@mail.com',
      name: 'Spencer Spencer',
    },
  ];

  findCustomerById(id: number): Customer | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto): void {
    this.customers.push(customerDto);
  }

  getCustomers(): Customer[] {
    return this.customers;
  }
}
