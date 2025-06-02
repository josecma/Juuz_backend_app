import { Prisma } from "@prisma/client";
import User from "../../domain/entities/user";

export default class UserMapper {
    static to(
        orm: Prisma.UserGetPayload<{
            include: {
                identities: true,
            }
        }>
    ) {

        const {
            firstName,
            lastName,
            id,
            verified,
        } = orm;

        const user = new User(
            {
                id,
                firstName,
                lastName,
                verified,
            }
        );

        return user;

    };

};