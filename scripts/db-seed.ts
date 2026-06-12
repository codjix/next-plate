import { db } from "@/database";
import * as seeds from "@/database/seeds";

const runSeeds = async () => {
  const start = Date.now();
  const list = Object.values(seeds).flatMap((seedItem) => seedItem.seeds);
  return db
    .transaction(async (trx) => list.map((seed) => seed(trx)))
    .finally(() => console.log(`Seeding completed successfully in ${Date.now() - start}ms`))
    .catch((err) => console.error("Seeding failed: ", err));
};

await runSeeds();
