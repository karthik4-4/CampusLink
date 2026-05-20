import "dotenv/config";
import path from "node:path";
import { defineConfig, env } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrate: {
    async adapter(processEnv: NodeJS.ProcessEnv) {
      const { Pool } = await import("pg");
      return new PrismaPg(new Pool({ connectionString: processEnv["DATABASE_URL"] }));
    },
  },
});
