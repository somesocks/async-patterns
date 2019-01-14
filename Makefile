
NPM=pnpm

.PHONY: default setup help

##
##
##	async-patterns
##		this is the base project makefile
##
##

default: help

##	COMMANDS
##

##		make help - display the help
##
help:
	@grep "^##.*" ./Makefile

##		make setup - setup for local development
##
setup:
	$(NPM) install

build-src:
	$(NPM) run cmd-build-src

build-pack: build-src
	cp ./.npmignore ./dist
	cp ./package.json ./dist

build-docs:
	$(NPM) run cmd-build-docs
	cp ./README.md ./dist


##		make build - build the package
##
build: build-src build-pack build-docs



test-cases:
	$(NPM) run cmd-test-cases -- $(MOCHA)

test-eslint:
	$(NPM) run cmd-test-eslint -- $(ESLINT)

##		make test - run test cases against the built package
##
test: test-cases test-eslint



##		make package-check - list the files that will be present in the package
##
package-check:
	cd ./dist && $(NPM) pack --dry-run
	cd ./dist && $(NPM) publish --dry-run

##		make package-publish - publish the current dist dir
##
package-publish:
	cd ./dist && $(NPM) publish

##
##
