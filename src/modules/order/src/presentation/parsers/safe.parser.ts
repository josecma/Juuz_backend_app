export const safeParser = {
    string: val => val ? String(val) : undefined,
    number: val => val ? Number(val) : undefined,
    float: val => val ? parseFloat(val) : undefined,
    int: val => val ? parseInt(val) : undefined,
    bool: val => val ? Boolean(val) : undefined,
    date: val => val ? new Date(val) : undefined
};