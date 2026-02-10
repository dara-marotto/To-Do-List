import { IsBoolean, IsEnum, IsString, MaxLength } from "class-validator";
import { ColorTagEnum } from "../enums/color-tag.enum";
import { StateTagEnum } from "../enums/state-tag.enum";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(ColorTagEnum, { message: 'This color tag does not exist'})
    colorTag: ColorTagEnum;

    @IsEnum(StateTagEnum, {message: 'This state tag does not exist'})
    state: StateTagEnum;

    @IsBoolean()
    active: boolean;
}
