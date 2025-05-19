import { $Enums } from "@prisma/client";

export class OtpValidateDto {
  secret: string;
  timestamp: number;
}
