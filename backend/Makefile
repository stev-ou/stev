.PHONY: test
test:
	python3 -m unittest discover -v -s tests/
	pylint --errors-only backend

.PHONY: run
run:
	gunicorn -w 4 -b 0.0.0.0:5050 server:app
