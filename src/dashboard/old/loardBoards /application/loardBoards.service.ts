import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { LeaderBoardDto } from '../domain/loardBoard.dtos';
import { ResponseLeaderBoardDto } from '../domain/responseLoardBoard.dtos';
import { LEADERBOARD_CACHE } from '../domain/leaderboard.cache';

@Injectable()
export class LoaderBoardService {
  constructor(@Inject(LEADERBOARD_CACHE) private cacheManager: Cache) {}
  private leaderboardKey = 'leaderboard';

  async getLeaderboard(): Promise<ResponseLeaderBoardDto[]> {
    const leaderboard = await this.cacheManager.get<ResponseLeaderBoardDto[]>(
      this.leaderboardKey
    );
    return leaderboard || [];
  }

  async addOrUpdateEntry(entry: LeaderBoardDto): Promise<void> {
    let leaderboard = await this.getLeaderboard();
    const index = leaderboard.findIndex((e) => e.name === entry.name);
    if (index !== -1) {
      leaderboard[index].count = leaderboard[index].count + 1;
    } else {
      leaderboard.push({ count: 1, name: entry.name });
    }
    leaderboard = leaderboard.sort((a, b) => b.count - a.count); // Ordenar por cantidad
    await this.cacheManager.set(this.leaderboardKey, leaderboard);
  }

  async clearLeaderboard(): Promise<void> {
    await this.cacheManager.del(this.leaderboardKey);
  }

  async getEntriesStartingWith(
    prefix: string
  ): Promise<ResponseLeaderBoardDto[]> {
    const leaderboard = await this.getLeaderboard();
    return prefix === undefined
      ? leaderboard
      : leaderboard.filter((entry) => entry.name.startsWith(prefix));
  }
}
