import { $Enums } from '@prisma/client';

export class Payload {
  id: string;
  companyId: string;
  sessionId: string;
  pointId: string;
  hash: string;
  // logType: $Enums.RolesEnum;
}
