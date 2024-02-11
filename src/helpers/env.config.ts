import "dotenv/config";
import { get } from "env-var";

export const envs = {
  MONGODB_URI: get("MONGODB_URI").required().asString(),
  DB_NAME: get("DB_NAME").required().asString(),
};
