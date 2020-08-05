RM=rm -rf

.PHONY: all clean

all:
	yarn install
	yarn workspace button build

watch:
	yarn workspace $(P) watch

build:
	yarn workspace $(P) build

clean:
	$(RM) yarn.lock node_modules
	yarn workspace button clean