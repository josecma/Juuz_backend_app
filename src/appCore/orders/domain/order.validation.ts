import { $Enums } from '@prisma/client';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidSubStatus', async: false })
export class IsValidSubStatusConstraint
  implements ValidatorConstraintInterface {
  validate(substatus: any, args: ValidationArguments) {
    const object = args.object as any;
    const status = object.status;
    return true;

    // const validSubStatuses = {
    //   [$Enums.OrderStatusEnum.PENDING]: [
    //     $Enums.OrderSubStatus.UPCOMING,
    //     $Enums.OrderSubStatus.OUT_OF_TIME,
    //   ],
    //   [$Enums.OrderStatusEnum.IN_TRANSIT]: [
    //     $Enums.OrderSubStatus.UPCOMING,
    //     $Enums.OrderSubStatus.LATE_ORDER,
    //   ],
    //   [$Enums.OrderStatusEnum.HISTORY]: [
    //     $Enums.OrderSubStatus.CANCELLED,
    //     $Enums.OrderSubStatus.COMPLETE,
    //   ],
    // };

    // return validSubStatuses[status]?.includes(substatus);
  }

  defaultMessage(args: ValidationArguments) {
    return `Substatus $value is not valid for status ${args.object['status']}.`;
  }
}
