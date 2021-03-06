# gitlab-ci-validator README

Visual Studio Code extension: Validate the content of your GitLab CI YAML file.

> **Deprecated!** GitLab now has its official extension called [GitLab Workflow](https://marketplace.visualstudio.com/items?itemName=fatihacet.gitlab-workflow). It does much more than this extension ever planned to do.

> This extension will remain available, but no longer receives any updates.

## Features

Detect errors in a Gitlab CI YAML file before pushing it to the server.

The command `Validate GitLab CI YAML` will send your currently open `.gitlab-ci.yal` file for validation to the GitLab API. It will not only report YAML syntax errors but also content errors (For example: A missing `name` key for an `environment`).

> **Be aware:** This will send the content of your GitLab CI YAML file to the [public GitLab API](https://docs.gitlab.com/ee/api/lint.html). If your YAML file contains sensitive information, do not use this extension or set a custom GitLab instance URL in the extension settings.

## Extension Settings

| Setting                   | Default              | Description                                                   |
|---------------------------|----------------------|---------------------------------------------------------------|
| `gitLabURL`               | `https://gitlab.com` | URL to the GitLab instance used for validation                |
| `ignoreCertificateErrors` | `false`              | Ignore TLS/SSL certificate errors when calling the GitLab API |

## Known Issues

None.

## License

MIT licensed.

## Release Notes

### 1.0.0

Initial release of `gitlab-ci-validator`.
