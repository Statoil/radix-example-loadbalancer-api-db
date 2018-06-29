build:
	docker-compose build
run:
	docker-compose up --scale app=4
build-no-loadbalancer:
	docker build -t radix/${IMAGE_NAME} .