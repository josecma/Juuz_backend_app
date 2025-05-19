export default interface RequestPort {
    create(
        params: {
            request: {
                id?: string;
                source: {
                    type: 'EMAIL' | 'PLATFORM',
                    value: string;
                };
                target: {
                    type: 'EMAIL' | 'PLATFORM',
                    value: string;
                };
                type: 'JOIN',
            };
        },
    ): Promise<{
        id: string;
        source: {
            type: 'EMAIL' | 'PLATFORM';
            value: string;
        };
        target: {
            type: 'EMAIL' | 'PLATFORM';
            value: string;
        };
        type: 'JOIN';
    }>;

    update(
        params: {
            id: string;
            updateObject: {
                source?: {
                    type: 'EMAIL' | 'PLATFORM',
                    value: string;
                };
                target?: {
                    type: 'EMAIL' | 'PLATFORM',
                    value: string;
                };
                type?: 'JOIN',
            };
        },
    ): Promise<{
        id: string;
        source: {
            type: 'EMAIL' | 'PLATFORM',
            value: string;
        };
        target: {
            type: 'EMAIL' | 'PLATFORM',
            value: string;
        };
        type: 'JOIN',
    }>;
};