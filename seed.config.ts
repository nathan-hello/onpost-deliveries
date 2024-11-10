import { SeedPostgres } from "@snaplet/seed/adapter-postgres";
import { defineConfig } from "@snaplet/seed/config";
import postgres from "postgres";

import {config} from "dotenv";

const env = config({path: ".env.local"})
const url = env.parsed?.SECRET_SUPABASE_URL
if (url === undefined) {
        throw Error("supabase db url undefined")
}

export default defineConfig({
  adapter: () => {
    const client = postgres(url);
    return new SeedPostgres(client);
  },
  select: [
    // We don't alter any extensions tables that might be owned by extensions
    "!*",
    // We want to alter all the tables under public schema
    "public*",
    // We also want to alter some of the tables under the auth schema
    "auth.users",
    "auth.identities",
    "auth.sessions",
  ]
});
