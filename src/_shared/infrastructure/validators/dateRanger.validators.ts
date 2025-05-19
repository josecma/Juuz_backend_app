import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'dateRange', async: false })
export class DateRangeValidator implements ValidatorConstraintInterface {
  validate(value: Date): boolean {
    if (!(value instanceof Date)) {
      return false;
    }

    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    // Convert inputDate to YYYY-MM-DD format for comparison
    const formattedInputDate = value.toISOString().split('T')[0];
    const formattedToday = today.toISOString().split('T')[0];
    const formattedSevenDaysFromNow = sevenDaysFromNow
      .toISOString()
      .split('T')[0];

    return (
      formattedInputDate >= formattedToday &&
      formattedInputDate <= formattedSevenDaysFromNow
    );
  }

  defaultMessage(): string {
    return 'Expiration time must be within today and 7 days from today in YYYY-MM-DD format';
  }
}
