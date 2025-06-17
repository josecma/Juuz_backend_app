import UUIDAdapter from "../../infrastructure/adapters/uuid.adapter";

export default class BuildChannelNameService {

    private static _builtChannelName: string = "juuz";

    static tracking(): typeof BuildChannelNameService {

        this._builtChannelName = `${this._builtChannelName}:tracking`;

        return this;

    };

    static user(): typeof BuildChannelNameService {

        this._builtChannelName = `${this._builtChannelName}:user`;

        return this;

    };

    static company(): typeof BuildChannelNameService {

        this._builtChannelName = `${this._builtChannelName}:company`;

        return this;

    };

    static private(): typeof BuildChannelNameService {

        this._builtChannelName = `${this._builtChannelName}:private`;

        return this;

    };

    static uuid(): typeof BuildChannelNameService {

        this._builtChannelName = `${this._builtChannelName}:${UUIDAdapter.get()}`;

        return this;

    };

    static getBuiltChannelName() {

        const builtChannelName = this._builtChannelName;

        this._builtChannelName = "juuz";

        return builtChannelName;

    };

};