import { v4 as uuidv4, validate } from 'uuid';

export default class UUIDAdapter {

    static get() {
        return uuidv4();
    };

    static validate(
        params: {
            uuid: string;
        }
    ) {

        const { uuid } = params;

        return validate(uuid);

    };

};