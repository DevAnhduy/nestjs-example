import { ApiProperty } from '@nestjs/swagger';

export class AppCreateModel {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
