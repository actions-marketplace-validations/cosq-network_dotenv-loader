# Read Environment File GitHub Action

This GitHub Action reads an environment file (.env) and resolves variable references, including `${{ env.VAR_NAME }}`, `${{ secrets.VAR_NAME }}`, and `${{ vars.VAR_NAME }}`. It exports each variable name as an environment variable with its resolved value for use in your GitHub Actions workflows.

## Usage

### Inputs

- `env-file` (required): The path to the environment file containing environment variables in the format "VariableName=VariableValue" on each line.

### Resolving Variable References

The action supports resolving variable references in the environment file. You can use the following syntax in your .env file:

- `${{ env.VAR_NAME }}`: To reference environment variables set in the workflow.
- `${{ secrets.VAR_NAME }}` and `${{ vars.VAR_NAME }}`: Cannot be read directly within the action. Instead, pass these values as arbitrary parameters to the workflow task with the same name.

### Example Workflow

```yaml
name: Read Environment File Example

on:
  push:
    branches:
      - main

jobs:
  read_env:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Read environment file and set variables
        uses: cosq-network/dotenvy@v1.0.1
        with:
          env-file: path/to/.env
          MY_SECRET: ${{ secrets.MY_SECRET }}
          MY_VARIABLE: ${{ vars.MY_VARIABLE }}
```

Replace `path/to/.env`, `MY_SECRET`, and `MY_VARIABLE` with the actual path to your .env file, the names of the secrets, and the workflow-level variables you want to use.

### Limitations

Please note that this action cannot directly read `${{ secrets.VAR_NAME }}` and `${{ vars.VAR_NAME }}`. Instead, users should pass these values as arbitrary parameters to the workflow task with the same name.

## License

This GitHub Action is licensed under the [MIT License](LICENSE).

## Contributions

Contributions to this GitHub Action are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Credits

This action was created by [Benoy Bose](https://github.com/benoybose).
