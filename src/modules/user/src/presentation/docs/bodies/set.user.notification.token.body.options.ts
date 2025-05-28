import { ApiBodyOptions } from "@nestjs/swagger";
import SetUserNotificationTokenSchema from "../schemas/set.user.notification.token.schema";

export default {
    type: SetUserNotificationTokenSchema,
} as ApiBodyOptions;