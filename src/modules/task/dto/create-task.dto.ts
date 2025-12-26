import { ColorTagEnum } from "../enums/color-tag.enum";
import { StateTagEnum } from "../enums/state-tag.enum";

export class CreateTaskDto {
    title: string;
    description: string;
    colorTag: ColorTagEnum;
    state: StateTagEnum;
    active: boolean;
}
