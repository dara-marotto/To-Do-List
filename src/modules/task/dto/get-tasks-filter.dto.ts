import { IsEnum, IsOptional } from "class-validator";
import { STATE_TAG } from "../enums";
import { COLOR_TAG } from "../enums";

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(STATE_TAG)
  state?: string;

  @IsOptional()
  @IsEnum(COLOR_TAG)
  colorTag?: string;
}