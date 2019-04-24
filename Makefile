.PHONY: pretty

pretty: 
	npm install -g prettier	
	prettier --single-quote --trailing-comma es5 --write "{src,__{tests,mocks}__}/**/*.js"

.PHONY: image

image:
	docker build . -t gcr.io/ou-reviews/stev
