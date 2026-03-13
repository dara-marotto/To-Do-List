import { UserPayload } from "../interfaces";
import { Request } from "express";

export interface RequestWithUser extends Request {
  user: UserPayload;
}