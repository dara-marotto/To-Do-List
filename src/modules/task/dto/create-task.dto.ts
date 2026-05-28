import { IsBoolean, IsEnum, IsString } from "class-validator";
import { COLOR_TAG } from "../enums";
import { STATE_TAG } from "../enums";
import {  ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'The title of the task'
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Buy milk, eggs, and bread from the supermarket.',
    description: 'The description of the task'
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: COLOR_TAG.BLUE,
    description: 'The color tag of the task'
  })
  @IsEnum(COLOR_TAG, { message: 'This color tag does not exist'})
  colorTag: COLOR_TAG;

  @ApiProperty({
    example: STATE_TAG.TO_DO,
    description: 'The state tag of the task'
  })
  @IsEnum(STATE_TAG, {message: 'This state tag does not exist'})
  state: STATE_TAG;

  @ApiProperty({
    example: true,
    description: 'The active status of the task'
  })
  @IsBoolean()
  active: boolean;
}
