import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ApiResponse } from '@nestjs/swagger';
@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  @ApiResponse({ description: 'Hello' })
  getHello(): string {
    return this.exampleService.getHello();
  }
}
