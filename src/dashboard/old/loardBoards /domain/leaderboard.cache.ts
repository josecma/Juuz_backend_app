import { caching } from 'cache-manager';

export const LEADERBOARD_CACHE = 'LEADERBOARD_CACHE';

export const LeaderboardCacheProvider = {
  provide: LEADERBOARD_CACHE,
  useFactory: async () => {
    return caching('memory', {
      ttl: 1200000,
      max: 100,
    });
  },
};
