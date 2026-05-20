const path = require("node:path");
const { defineConfig, env } = require("prisma/config");

// Load local .env if present
try {
  require("dotenv").config();
} catch (e) {
  // Ignored in environments where dotenv is not loaded
}

module.exports = defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrate: {
    async adapter(processEnv) {
      const { Pool } = require("pg");
      const { PrismaPg } = require("@prisma/adapter-pg");
      return new PrismaPg(new Pool({ connectionString: processEnv["DATABASE_URL"] }));
    },
  },
});
