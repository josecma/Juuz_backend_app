import { Inject, Injectable } from "@nestjs/common";
import RequestWriteRepository from "src/modules/shared/src/infrastructure/repositories/request.write.repository";
import RequestPort from "../../application/ports/request.port";

@Injectable({})
export default class RequestAdapter implements RequestPort {

    public constructor(
        @Inject(RequestWriteRepository)
        private readonly requestWriteRepository: RequestWriteRepository,
    ) { };

    public async create(
        params: {
            request: {
                id?: string;
                source?: {
                    type: string;
                    id: string;
                };
                target: {
                    type: string;
                    id: string;
                };
                channel: {
                    method: string;
                    target: string;
                }
                type: string,
            };
        },
    ) {

        const {
            request,
        } = params;

        try {

            const res = await this.requestWriteRepository.save(
                {
                    request,
                }
            );

            return res as unknown as {
                id?: string;
                source?: {
                    type: string;
                    id: string;
                };
                target: {
                    type: string;
                    id: string;
                };
                channel: {
                    method: string;
                    target: string;
                }
                type: string,
            };

        } catch (error) {

            throw error;

        };

    };

    // public async update(
    //     params: {
    //         id: string;
    //         updateObject: {
    //             source?: {
    //                 type: "EMAIL" | "PLATFORM";
    //                 value: string;
    //             };
    //             target?: {
    //                 type: "EMAIL" | "PLATFORM";
    //                 value: string;
    //             };
    //             type?: "JOIN";
    //         };
    //     }
    // ): Promise<{
    //     id: string;
    //     source: {
    //         type: "EMAIL" | "PLATFORM";
    //         value: string;
    //     };
    //     target: {
    //         type: "EMAIL" | "PLATFORM";
    //         value: string;
    //     };
    //     type: "JOIN";
    // }> {

    //     const {
    //         id,
    //         updateObject,
    //     } = params;

    //     try {

    //         const res = await this.requestWriteRepository.update(
    //             {
    //                 id,
    //                 updateObject,
    //             }
    //         );

    //         return res as unknown as {
    //             id: string;
    //             source: {
    //                 type: 'EMAIL' | 'PLATFORM';
    //                 value: string;
    //             };
    //             target: {
    //                 type: 'EMAIL' | 'PLATFORM';
    //                 value: string;
    //             };
    //             type: 'JOIN';
    //         };

    //     } catch (error) {

    //         throw error;

    //     };

    // };

};