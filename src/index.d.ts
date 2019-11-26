import { Pool } from "mysql";

declare module "mysql-promisify-pool" {
  const pool: Pool;
}