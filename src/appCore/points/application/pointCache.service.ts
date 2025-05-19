// src/appCore/points/application/pointCache.service.ts

import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { POINT_CACHE } from '../domain/pointboard.cache';
import { UserDriverEntry, UserDriverResponse } from '../domain/point.interface';

@Injectable()
export class PointCacheService {
  constructor(@Inject(POINT_CACHE) private cacheManager: Cache) {}

  /**
   * Agrega o actualiza una entrada en el caché.
   * @param entry - Objeto que contiene userId y driverId.
   */
  async addOrUpdateEntry(entry: UserDriverEntry): Promise<any> {
    try {
      const { userId, driverId } = entry;

      // Guardar driverId bajo userId
      await this.cacheManager.set(`user:${userId}`, driverId);

      // Agregar userId al conjunto de userIds asociados al driverId
      const users =
        (await this.cacheManager.get<string[]>(`driver:${driverId}:users`)) ||
        [];
      users.push(userId);
      await this.cacheManager.set(`driver:${driverId}:users`, users);

      return { message: 'ok' };
    } catch (e) {
      throw new BadRequestException('Cache Error');
    }
  }

  /**
   * Obtiene el driverId asociado a un userId.
   * @param userId - El ID del usuario.
   * @returns El driverId asociado o null si no se encuentra.
   */
  async getDriverByUserId(userId: string): Promise<string | null> {
    try {
      const driverId = await this.cacheManager.get<string>(`user:${userId}`);
      return driverId || null;
    } catch (e) {
      throw new BadRequestException('Cache Error');
    }
  }

  /**
   * Obtiene todos los userIds asociados a un driverId.
   * @param driverId - El ID del conductor.
   * @returns Un arreglo de objetos que contienen userId y driverId.
   */
  async getUserIdsByDriverId(driverId: string): Promise<UserDriverResponse[]> {
    try {
      const userIds =
        (await this.cacheManager.get<string[]>(`driver:${driverId}:users`)) ||
        [];

      // Mapear los userIds a un formato de respuesta
      return userIds.map((userId) => ({
        userId,
        driverId,
      }));
    } catch (e) {
      throw new BadRequestException('Cache Error');
    }
  }

  /**
   * Elimina una entrada por userId.
   * @param userId - El ID del usuario a eliminar.
   */
  async removeEntryByUserId(userId: string): Promise<void> {
    try {
      // Obtener driverId asociado al userId
      const driverId = await this.cacheManager.get<string>(`user:${userId}`);

      if (driverId) {
        // Eliminar la clave userId
        await this.cacheManager.del(`user:${userId}`);

        // Remover userId del conjunto asociado al driverId
        const users =
          (await this.cacheManager.get<string[]>(`driver:${driverId}:users`)) ||
          [];
        const updatedUsers = users.filter((user) => user !== userId);
        await this.cacheManager.set(`driver:${driverId}:users`, updatedUsers);
      }
    } catch (e) {
      throw new BadRequestException('Cache Error');
    }
  }

  /**
   * Limpia todo el caché.
   * Esta operación puede ser peligrosa en un entorno compartido.
   */
  async clearCache(): Promise<void> {
    try {
      // Limpiar el caché en memoria
      await this.cacheManager.reset();
    } catch (e) {
      throw new BadRequestException('Cache Error');
    }
  }

  /**
   * Obtiene todos los datos almacenados en el caché.
   * @returns Un objeto que contiene todos los pares userId y driverId.
   */
  async getAllEntries(): Promise<{ [userId: string]: string }> {
    try {
      const allEntries: { [userId: string]: string } = {};
      const keys = await this.cacheManager.store.keys(); // Esto es un ejemplo, puede que necesites implementar tu propia lógica para obtener las claves

      for (const key of keys) {
        if (key.startsWith('user:')) {
          const userId = key.split(':')[1];
          const driverId = await this.cacheManager.get<string>(key);
          allEntries[userId] = driverId;
        }
      }

      return allEntries;
    } catch (e) {
      throw new BadRequestException('Cache Error');
    }
  }
}
