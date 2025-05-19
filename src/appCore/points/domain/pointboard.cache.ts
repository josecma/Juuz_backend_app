import { caching } from 'cache-manager';

export const POINT_CACHE = 'POINT_CACHE';

export const PointCacheProvider = {
  provide: POINT_CACHE,
  useFactory: async () => {
    return caching('memory', {
      ttl: 120000,
      max: 300,
    });
  },
};
