export default interface IGeoService {
    distance(params: {
        p1: {
            latitude: number;
            longitude: number;
        }; p2: {
            latitude: number;
            longitude: number;
        }
    }): number;
};