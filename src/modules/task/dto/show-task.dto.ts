import { COLOR_TAG } from "../enums/color-tag.enum";
import { STATE_TAG } from "../enums/state-tag.enum";

export class ShowTaskDto {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly colorTag: COLOR_TAG,
        readonly state: STATE_TAG,
        readonly active: boolean
    ) {}
}