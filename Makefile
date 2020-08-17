.PHONY: all clean

all:
	yarn install
	yarn workspace cascara build

watch:
	yarn workspace $(P) watch

build:
	yarn workspace $(P) build

clean:
	yarn workspace button clean
	yarn workspace pagination clean