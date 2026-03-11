import { COLOR_TAG } from "../enums/color-tag.enum";
import { STATE_TAG } from "../enums/state-tag.enum";

export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  colorTag: COLOR_TAG;
  state: STATE_TAG;
  active: boolean;
}