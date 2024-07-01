# This is the public Makefile containing some build commands.
# You can implement some additional personal commands such as login and sync in Makefile.private.mk (unversioned).

# fetch AWS testing credentials
login:
	make -f Makefile.private.mk login

# Sync your development fork with upstream.
# Recommended contents:
# gh repo sync {your_github_account_name}/aws-sdk-js-v3 -b main
# git fetch --all
sync:
	make -f Makefile.private.mk sync

link-smithy:
	rm -rf ./node_modules/\@smithy
	ln -s ../../smithy-typescript/packages/ ./node_modules/\@smithy

unlink-smithy:
	rm ./node_modules/\@smithy
	yarn --check-files

copy-smithy:
	node ./scripts/copy-smithy-dist-files

gen-auth:
	node ./scripts/cli-dispatcher client sso - gen;
	node ./scripts/cli-dispatcher client sts - gen;
	node ./scripts/cli-dispatcher client sso-oidc - gen;
	node ./scripts/cli-dispatcher client cognito identity - gen;

b-auth:
	node ./scripts/cli-dispatcher client sso - deps;
	node ./scripts/cli-dispatcher client sts - b;
	node ./scripts/cli-dispatcher client sso-oidc - b;
	node ./scripts/cli-dispatcher client cognito identity - b;

# Runs build for all packages using Turborepo
turbo-build:
	(cd scripts/remote-cache && yarn)
	node scripts/remote-cache/ start&
	sleep 3
	npx turbo run build --api="http://localhost:3000" --team="aws-sdk-js" --token="xyz"
	node scripts/remote-cache/ stop


# Runs Turbo build using lambda remote cache
turbo-cache:
	npx turbo run build --api="https://90674d90pf.execute-api.us-west-2.amazonaws.com/TurborepoRemoteCache" --team="aws-sdk-js" --token="xyz"

# run turbo build for packages only.
tpk:
	npx turbo run build --filter='./packages/*'

server-protocols:
	yarn generate-clients -s
	yarn test:server-protocols