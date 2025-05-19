
export default class FindChannelService {

    public constructor() { };

    public filter(
        params: {
            channels: Array<{
                id: string;
                name: string;
                permissions: Array<string>;
            }>;
        }
    ) { };

};