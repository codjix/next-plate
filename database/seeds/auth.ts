import { type $DBTrx, schema } from "@/database";

const users = ["admin", "user"] as const;
const ids = ["adminOOOOOOOOOOOOOOOOOOOOOOOOOOO", "userOOOOOOOOOOOOOOOOOOOOOOOOOOOO"];

const userSeeds = async (trx: $DBTrx) => {
  if (["development", "test"].includes(process.env.NODE_ENV)) {
    await trx.insert(schema.user).values(
      users.map<schema.$UserInsert>((user, i) => ({
        id: ids[i],
        username: user,
        name: `Demo ${user}`,
        email: `${user}@example.com`,
        emailVerified: true,
      })),
    );
  }
};

const credentials = {
  providerId: "credential",
  password: Bun.password.hashSync("changeme", "bcrypt"),
};

const accountSeeds = async (trx: $DBTrx) => {
  if (["development", "test"].includes(process.env.NODE_ENV)) {
    await trx
      .insert(schema.account)
      .values(ids.map((id) => ({ id, accountId: id, userId: id, ...credentials })));
  }
};

export const seeds = [userSeeds, accountSeeds];
