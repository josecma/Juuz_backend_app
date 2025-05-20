import { Request } from "express";

export default interface Request extends Request {
    user?: {
        id: string;
    };
};