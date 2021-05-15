function loadEnvironmentVariables (keyName) {
  const envVar = process.env[keyName];

  if(!envVar) {
    throw new Error(`Must include ${keyName} in Env.`);
  }

  return envVar;
}

module.exports = {
  postgresUrl: loadEnvironmentVariables('POSTGRES_URI')
}