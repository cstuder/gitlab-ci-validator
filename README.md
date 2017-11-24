# gitlab-ci-validator README

Visual Studio Code extension: Validate the content of your GitLab CI YAML file.

## Features

Detect errors in a Gitlab CI YAML file before pushing it to the server.

The command `Validate GitLab CI YAML` will send your currently open `.gitlab-ci.yal` file for validation to the GitLab API. It will not only report YAML syntax errors but also content errors (For example: A missing `name` key for an `environment`).

> **Be aware:** This will send the content of your GitLab CI YAML file to the [public GitLab API](https://docs.gitlab.com/ee/api/lint.html). If your YAML file contains sensitive information, do not use this extension.

## Extension Settings

None.

## Known Issues

None.

## License

MIT licensed.

## Release Notes

### 1.0.0

Initial release of `gitlab-ci-validator`.
