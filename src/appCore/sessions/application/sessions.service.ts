import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaGenericService } from 'src/_shared/infrastructure/generic/prismaService.generic';
import { Prisma } from '@prisma/client';
import { SessionEntity } from '../domain/session.entity';

@Injectable()
export class SessionsService extends PrismaGenericService<
  SessionEntity,
  Prisma.SessionCreateArgs,
  Prisma.SessionFindUniqueArgs,
  Prisma.SessionUpdateArgs,
  Prisma.SessionDeleteArgs,
  Prisma.SessionFindManyArgs
> {
  private readonly logger = new Logger(SessionsService.name);
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.session);
  }
}
