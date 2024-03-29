.PHONY: install
install:
	bash install.sh

.PHONY: pretty

pretty: 
	prettier --single-quote --trailing-comma es5 --write "{src,__{tests,mocks}__}/**/*.js"

.PHONY: image

image:
	docker build . -t gcr.io/stev-ou/stev

.PHONY: run
run: image
	docker run -d -p 3000:8080 gcr.io/stev-ou/stev:latest

.PHONY: clean

clean:
	rm -rf node_modules
