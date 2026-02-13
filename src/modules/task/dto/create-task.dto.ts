import { IsBoolean, IsEnum, IsString, MaxLength } from "class-validator";
import { COLOR_TAG } from "../enums/color-tag.enum";
import { STATE_TAG } from "../enums/state-tag.enum";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(COLOR_TAG, { message: 'This color tag does not exist'})
    colorTag: COLOR_TAG;

    @IsEnum(STATE_TAG, {message: 'This state tag does not exist'})
    state: STATE_TAG;

    @IsBoolean()
    active: boolean;
}
