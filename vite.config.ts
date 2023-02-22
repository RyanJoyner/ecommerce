import { defineConfig, loadEnv } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as dotenv from 'dotenv';

// SETUP ENVRIONMENT VARIABLES
const envDir = process?.cwd();   // "~/secrets/qwik-env-vars-demystified".replace(/^~\//g, os.homedir() + "/");
const envFile = ".env"; // `.env.${process?.env.NODE_ENV}`;

// loadEnv() ONLY LOADS variables with "VITE_" prefix
loadEnv(process?.env.NODE_ENV!, envDir);

// dotenv.config() loads all variables from the .env file, including secrets
dotenv.config({ path: `${envDir}/${envFile}` });

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
