const core = require('@actions/core');
const dotenv = require('dotenv');

async function run() {
  try {
    const envFilePath = core.getInput('env-file');
    const envVars = dotenv.config({ path: envFilePath }).parsed;
    //core.warning(process.env);
    for (const [varName, varValue] of Object.entries(process.env)) {
      core.warning(`${varName}: ${varValue}`);
    }

    if (envVars) {
      for (const [varName, varValue] of Object.entries(envVars)) {
        const resolvedValue = resolveVariableReferences(varValue);
        core.exportVariable(varName, resolvedValue);
        core.debug(`Exported ${varName}: ${resolvedValue}`);
      }
    } else {
      throw new Error(`Failed to read environment file: ${envFilePath}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

function resolveVariableReferences(value) {
  const envReferenceRegex = /\${{ *env\.([a-zA-Z_]+) *}}/g;
  const secretsReferenceRegex = /\${{ *secrets\.([a-zA-Z_]+) *}}/g;
  const varsReferenceRegex = /\${{ *vars\.([a-zA-Z_]+) *}}/g;

  value = value.replace(envReferenceRegex, (_, varName) => process.env[varName] || '');
  value = value.replace(secretsReferenceRegex, (_, varName) => core.getInput(varName, { required: true }) || '');
  value = value.replace(varsReferenceRegex, (_, varName) => core.getInput(varName, { required: true }) || '');

  return value;
}

run();
