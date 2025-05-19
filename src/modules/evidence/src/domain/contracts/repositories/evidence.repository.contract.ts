import Evidence from "../../evidence";

export default interface EvidenceRepositoryContract {

    findByFileKeys(
        params: {
            keys: Array<string>;
        }
    ): Promise<Array<{
        id: number;
        description: string;
        status: boolean;
        type: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        files: [string, string][];
    }>>;

    findBy(
        params: {
            pagination?: {
                page: number;
                limit: number;
            };
            findByObj: Partial<{
                userId: string;
                status: boolean;
                orderId: string;
                type: string;
                keys?: Array<string>;
            }>;
        }
    ): Promise<Array<{
        id: number;
        description: string;
        status: boolean;
        type: string;
        coordinates: {
            latitude: number;
            longitude: number;
        };
        files: [string, string][];
    }>>;

    findOneBy(
        params: {
            id: string;
        }
    ): Promise<any>;

    save(
        params: {
            userId: string;
            orderId: string;
            evidence: Evidence;
        }
    ): Promise<void>;

    update(
        params: {
            id: string;
            updateObj: Partial<{
                description: string;
                status: boolean;
                of: string;
                geoPoint: {
                    type: "POINT";
                    coordinates: {
                        latitude: number;
                        longitude: number;
                    };
                };
            }>;
        }
    ): Promise<void>;

};