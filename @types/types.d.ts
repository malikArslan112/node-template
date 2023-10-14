import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Model } from "sequelize";

declare global {
  type jwtVerifyType = {
    id: string;
    iat: number;
    exp: number;
  };

  type errorType = {
    name?: string;
    code?: number;
    status?: numberOrString;
    statusCode?: number;
    message?: string;
    isOperational: boolean;
    stack?: string;
    errors?: errorsArrayType[];
    path?: string;
    value?: string;
    keyValue?: object;
  };

  interface userType extends Model {
    id?: string;
    _id?: ObjectId;
    userId?: number;
    businessNumber?: string;
    twilioAccountId?: string;
    twilioAuthToken?: string;
    freeMode?: boolean;
    callResponse?: string;
  }

  type functionType = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;

  type numberOrString = number | string;

  type errorsArrayType = {
    message?: string;
  };

  type errorSignatureType = (
    err: errorType,
    req?: Request,
    res?: Response,
    next?: NextFunction,
  ) => void;

  type messagesQuery = {
    to?: string;
    from?: string;
    dateSent?: Date;
    dateSentBefore?: Date;
    dateSentAfter?: Date;
    limit?: number;
  };

  type callStatusOptions =
    | "queued"
    | "ringing"
    | "in-progress"
    | "canceled"
    | "completed"
    | "failed"
    | "busy"
    | "no-answer";

  type fieldsOptions =
    | "dateCreated"
    | "to"
    | "from"
    | "status"
    | "duration"
    | "startTime"
    | "endTime"
    | "price"
    | "direction";

  type callsQuery = {
    to?: string;
    from?: string;
    status?: callStatusOptions;
    startTime?: Date;
    endTime?: Date;
    startTimeBefore?: Date;
    startTimeAfter?: Date;
    limit?: number;
  };

  interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
  }

  namespace Express {
    interface Request {
      user?: userType;
    }
  }
}

export { errorType };
