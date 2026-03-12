import { COLOR_TAG } from "../enums";
import { STATE_TAG } from "../enums";

export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  colorTag: COLOR_TAG;
  state: STATE_TAG;
  active: boolean;
}