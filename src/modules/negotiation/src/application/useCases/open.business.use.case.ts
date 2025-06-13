import { Injectable } from "@nestjs/common";

@Injectable()
export default class OpenBusinessUseCase {

    public constructor() { };

    public async execute(
        params: {
            businessObject: {
                id: string,
                name: "order",
                details: {
                    type: "service.carrier"
                    metadata: Record<string, unknown>,
                },
            },
            stakeholders: Array<
                {
                    id: string,
                    role: string,
                    details: {
                        type: "company" | "person",
                        data: Record<string, unknown>,
                    }
                }
            >,
        }
    ) { };

};