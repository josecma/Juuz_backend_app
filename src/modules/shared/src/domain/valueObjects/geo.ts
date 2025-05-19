export default class Geo {
    type: "POINT" | "LINE" | "POLYGON";

    public constructor(params: { type: "POINT" | "LINE" | "POLYGON"; }) {

        const { type } = params;

        this.type = type;

    };

};