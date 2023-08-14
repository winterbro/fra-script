import * as dotenv from "dotenv";

dotenv.config();

export default function loadEnvVariable(variableName: string): string {
  const value = process.env[variableName];

  if (value !== undefined && value !== null) {
    return value;
  }

  throw new Error(`Environment variable ${variableName} is not set.`);
}
