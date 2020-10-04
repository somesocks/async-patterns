NPM=pnpm

TASKS=./tasks

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
	$(TASKS)/install.sh


##		make build - build the package
##
build:
	$(TASKS)/build.sh



##		make test - run test cases against the built package
##
test: test-mocha

test-mocha:
	$(TASKS)/test-mocha.sh




##		make package-check - list the files that will be present in the package
##
package-check:
	$(TASKS)/package-check.sh

##		make package-publish - publish the current dist dir
##
package-publish:
	$(TASKS)/package-publish.sh

##
##
