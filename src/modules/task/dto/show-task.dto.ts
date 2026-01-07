import { ColorTagEnum } from "../enums/color-tag.enum";
import { StateTagEnum } from "../enums/state-tag.enum";

export class ShowTaskDto {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly colorTag: ColorTagEnum,
        readonly state: StateTagEnum
    ) {}
}