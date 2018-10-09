nginx load balancer in front of 4 node.js application hosted using express. Uses redis container from docker hub to store number of requests. 

check operations in Makefile

make build
make run

todo: reference to docker instances from nginx.conf is hard coded to fit git directory name, should be done in a more general way


for docker-compose.yaml a nginx is used as a load balancer in front of the app. During make run scale=4 to fit the nginx.conf. 

for radix platform, we use kubernetes services for loadbalancing instead for nginx image. This is done by setting "replicas: 4".

go: 16
