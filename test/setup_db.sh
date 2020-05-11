#!/bin/bash

docker run --name pedanet-wordpress-test-mysql -p 33060:3306 -e MYSQL_ROOT_PASSWORD=random -e MYSQL_DATABASE=pedanet -d mysql:5.6