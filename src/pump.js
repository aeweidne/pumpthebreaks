#!/usr/bin/env node
'use strict';

const sh = require('shelljs');
const ch = require('chalk');
const GH = require('github');
const path = require('path');

const error = ch.red;
const success = ch.green;

// make sure its a PR
if (!process.env.TRAVIS_PULL_REQUEST) {
	sh.echo(error('Not a pull request, not really interested in pumping the breaks at this point.'));
	return process.exit(1);
}

// lets run the dang thing...
const result = sh.exec(`${path.join(__dirname, '..', 'node_modules/.bin/cracks')} -p "test", "package.json" --silent`, {silent: true}).stderr;

if (result) {
	sh.echo(error('Woah there, looks like the tests aren\'t uh, testing so well.'));
	sh.echo(error('Lets pump the breaks on this, I\'ll comment on the pull request right away'));

	const commentBody = `A potential API Breaking change was found in this PR:\n \`\`\`\n${result}\n\`\`\``;

	// get PR number
	const pull = process.env.TRAVIS_PULL_REQUEST;
	const user = process.env.TRAVIS_REPO_SLUG.split('/')[0];
	const repo = process.env.TRAVIS_REPO_SLUG.split('/')[1];

	// assume public github for now
	const github = new GH({
		host: 'api.github.com'
	});

	github.authenticate({
		type: 'oauth',
		token: process.env.GH_OAUTH_TOKEN
	});

	github.issues.createComment({
		user: user,
		repo: repo,
		number: pull,
		body: commentBody
	});
}
else {
	sh.echo(success('No API Breaking changes detected, let us ride into the sunset.'));
}
