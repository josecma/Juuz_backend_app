import { $Enums } from '@prisma/client';

export class Payload {
  id: number;
  companyId: number;
  sessionId: string;
  pointId: string;
  hash: string;
  logType: $Enums.RolesEnum;
}
