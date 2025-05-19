export function toCamelCase(obj: any): any {

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map((o) => toCamelCase(o));
    };

    if (typeof obj === "object" && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => {
                let value;

                if (typeof v === "object" && v !== null) {
                    if (v.hasOwnProperty("s") && v.hasOwnProperty("e") && v.hasOwnProperty("d")) {
                        value = Number((<any>v).d.join("")) * Math.pow(10, (<any>v).e);
                    } else {
                        value = toCamelCase(v);
                    }
                } else {
                    value = v;
                }

                return [k.replace(/_([a-zA-Z])/g, (_, letter) => letter.toUpperCase()), value];
            })
        );
    };

    return obj;

};
