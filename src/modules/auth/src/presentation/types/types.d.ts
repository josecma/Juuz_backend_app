import { Request } from "express";

export interface Request {

    user?: {
        id: string;
        identities: Array<
            {
                type: string;
                value: string;
            }
        >;
    };

};