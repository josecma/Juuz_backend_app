export type BaseJSON = {
    id: string;
};

export type BaseParams = BaseJSON;

export type FileJSON = BaseJSON & {
    key: string;
    mimeType: string;
    metadata?: Record<string, any>;
    size: number;
};

export type GeoPointJSON = {
    type: "POINT";
    coordinates: {
        latitude: number;
        longitude: number;
    };
};

export type CategoryJSON = BaseJSON & {
    name: string;
};