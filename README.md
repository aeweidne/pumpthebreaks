# pump the breaks

[`cracks`](https://github.com/semantic-release/cracks) is a fantastically helpful CLI for detecting API breaking changes in your code based on your last release.  This project wraps that functionality to be used in conjunction with GitHub PRs and Travis CI.

When API breaking changes are detected, `pumpthebreaks` will make a comment on your pull request with the error results so that everyone is aware that this pull request should result in a major release.  See [semver.org](https://semver.org) for more information regarding release types.

# usage

In yo `travis.yml`, as part of your `script`, add:

```
	- if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then npm i -g pumpthebreaks && pump; fi
```

and provide [your personal access token for GitHub](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) as an environment variable on Travis CI as `GH_OAUTH_TOKEN` so that `pumpthebreaks` can comment on your PR on your behalf.

You'll wanna put this after your coverage/testing commands so that those
commands don't _also_ use the old tests.
