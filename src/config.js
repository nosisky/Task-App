import dotenv from "dotenv";
dotenv.config();
/**
 * Default config for all environment types
 * @type {{db: string, apiPort: number}}
 */
const defaultConfig = {
  db: process.env.MONGO_DB_URL,
  apiPort: process.env.PORT || 3000,
};

/**
 * Enviroment specific configuration
 * @type {{production: {}, development: {}, test: {apiPort: number}}}
 */
const envConfig = {
  production: {},
  development: {
    env: process.env.NODE_ENV,
  },
  test: {
    apiPort: 3100,
  },
};

/**
 * Loads config based on the current environment
 * @returns {*}
 */
function loadConfig() {
  const env = process.env.NODE_ENV || "development";

  if (!envConfig[env]) {
    throw new Error(
      `Environment config for environment '${env}' not found. process.env.NODE_ENV must be one of '${Object.keys(
        envConfig
      )}'`
    );
  }

  console.log("[INFO] config loaded for environment: ", env);

  // merge default config with environment specific config
  return Object.assign({}, defaultConfig, envConfig[env]);
}

export default loadConfig();
